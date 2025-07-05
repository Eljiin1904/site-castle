import { Validation } from "@core/services/validation";
import { Database } from "@server/services/database";
import { Http } from "#app/services/http";
import { hubStatus } from "@core/services/hub-eight/HubEight";
import { currency, message } from "@core/services/validation/Validation";
import { Transactions } from "@server/services/transactions";
import { getServerLogger } from "@core/services/logging/utils/serverLogger";
import { Security } from "@server/services/security";
import config from "@server/config";
import { validateSignature } from "./utils/validateSignature";

const logger = getServerLogger({});

export default Http.createApiRoute({
  type: "post",
  path: "/transaction/rollback",
  secure: false,
  transaction: false,
  externalTransaction: true,
  externalTransactionType: "hub-eight",
  signatureRequired: true,
  body: Validation.object({
    user: Validation.username().required("User is required."),
    transaction_uuid: Validation.string().required("Transaction UUID required"),
    supplier_transaction_id: Validation.string().required("Supplier Transaction UUID required"),
    token: Validation.string().required("Token required"),
    round_closed: Validation.boolean().nullable().default(null),
    round: Validation.string().nullable().default(null),
    request_uuid: Validation.string().required("Request UUID required"),
    reference_transaction_uuid: Validation.string().required("Reference Transaction UUID required"),
    game_code: Validation.string().required("Game Code required"),
    meta: Validation.object().nullable().default(null),
  }),
  callback: async (req, res) => {
    const {
      user,
      transaction_uuid,
      supplier_transaction_id,
      token,
      round_closed,
      round,
      request_uuid,
      reference_transaction_uuid,
      game_code,
      meta,
    } = req.body;
    const options: any = {};
    const { hubEightPublicKey } = config;

    logger.info(`Bet Payload Received from Hubb88:  ${JSON.stringify(req.body)} `);

    // // 1. Validate Signature Header

    // 1. Validate Signature Header
    if (!validateSignature(req, "x-hub88-signature", hubEightPublicKey)) {
      res.status(200).json({
        status: "RS_ERROR_INVALID_SIGNATURE",
        request_uuid,
      });
      return;
    }
    // const retreivedSignature = req.headers["x-hub88-signature"] as string;

    // if (!retreivedSignature) {
    //   logger.error(`Signature not provided for Request Id ${request_uuid}`);

    //   res.status(200).json({
    //     status: "RS_ERROR_INVALID_SIGNATURE",
    //     request_uuid: request_uuid,
    //   });
    //   return;
    // }
    // const originalMessage = JSON.stringify(req.body);
    // const isValid = Security.verify(hubEightPublicKey, originalMessage, retreivedSignature);
    // if (!isValid) {
    //   logger.error(`Invalid Signature provided for Request Id ${request_uuid}`);
    //   res.status(200).json({
    //     status: "RS_ERROR_INVALID_SIGNATURE",
    //     request_uuid: request_uuid,
    //   });
    //   return;
    // }

    // 2. Validate Token
    try {
      const { userDetails } = await Security.getToken({ kind: "hub-eight-token", token });
      if (!userDetails) {
        res.status(200).json({
          status: "RS_ERROR_INVALID_TOKEN",
          request_uuid: request_uuid,
        });
        return;
      }
      options.username = userDetails.username;
    } catch (err: any) {
      logger.error(err);
      res.status(200).json({ status: err.message, request_uuid: request_uuid });
    }

    // 3. Check if a Valid User
    const userInfo = await Database.collection("users").findOne(options);
    if (!userInfo) {
      res.status(200).json({
        status: "RS_ERROR_INVALID_PARTNER",
        request_uuid: request_uuid,
      });
      return;
    }
    // 4.. Check if roll back was already processed for referenced transaction
    const previousRollbackTransaction = await Database.collection("transactions").findOne({
      kind: "hub-eight-rollback",
      referenceTransactionUUID: reference_transaction_uuid,
    });

    // Duplicate Checks -> For sure same transaction uuid if found.
    if (previousRollbackTransaction?.kind === "hub-eight-rollback") {
      const { transactionUUID, referenceTransactionUUID } = previousRollbackTransaction;

      const responseBase = {
        request_uuid,
        user: userInfo?.username,
        balance: userInfo.tokenBalance,
        currency: "USD",
      };
      // Idempotent Win Check -> Process the first rollback only
      // Criteria 1: If transaction uuid match a previous
      // Return RS_OK Transaction, processed already
      if (
        transactionUUID === transaction_uuid &&
        previousRollbackTransaction.round == round &&
        previousRollbackTransaction.referenceTransactionUUID == referenceTransactionUUID
      ) {
        logger.error(
          `Bet was already rolled back for User: ${userInfo.username}, Same Reference Transaction: ${reference_transaction_uuid},  Transaction UUID as previous ${transaction_uuid} and Round Id ${previousRollbackTransaction.round}, Current Request ID ${request_uuid} `,
        );
        res.status(200).json({ status: "RS_OK", ...responseBase });
        return;
      }

      // Criteria 2 : If reference transaction uuid match a previous rollback but using different transaction uuid
      // Return RS_OK
      if (
        referenceTransactionUUID === reference_transaction_uuid &&
        transactionUUID != transaction_uuid
      ) {
        logger.error(
          `Bet was already rolled back for User: ${userInfo.username}, Reference Transaction: ${reference_transaction_uuid}, Round Id ${previousRollbackTransaction.round}, different Transaction UUID ->  Previous: ${transactionUUID} and Current: ${transaction_uuid} `,
        );
        res.status(200).json({ status: "RS_OK", ...responseBase });
        return;
      }

      // Criteria 3 : If reference transaction uuid match a previous rollback
      // Return Duplicate
      if (referenceTransactionUUID === reference_transaction_uuid) {
        logger.error(
          `Bet was already rolled back for User: ${userInfo.username}, Reference Transaction: ${reference_transaction_uuid}`,
        );
        res.status(200).json({ status: "RS_ERROR_DUPLICATE_TRANSACTION", ...responseBase });
        return;
      }
    }

    // 5. Check if Hub Eighty Eight took out money for the specificed reference transaction id
    // Can be either a debit or credit
    // If it was a credit, deduct the amount
    // IF it was a debit, provide the money back
    const priorTransaction = await Database.collection("transactions").findOne({
      transactionUUID: reference_transaction_uuid,
    });

    try {
      if (!priorTransaction) {
        res.status(200).json({
          status: "RS_ERROR_TRANSACTION_DOES_NOT_EXIST",
          request_uuid: request_uuid,
          user: userInfo?.username,
        });
        return;
      }
      // If it was a deduction, make it an addition
      // If it was an addition, make it a deduction
      const rollbackAmount = -priorTransaction.amount;

      // 5. Rollbak basedon the amount
      await Transactions.createTransaction({
        kind: "hub-eight-rollback",
        autoComplete: true,
        user: userInfo,
        transactionUUID: transaction_uuid,
        supplierTransactionId: supplier_transaction_id,
        roundClosed: round_closed,
        round: round,
        requestUUID: request_uuid,
        gameCode: game_code,
        meta: meta || null,
        amount: rollbackAmount,
        username: userInfo.username,
        referenceTransactionUUID: reference_transaction_uuid,
      });

      const newBalance = await Database.collection("users").findOne(options);

      // Return user information with updated balance
      res.json({
        user: userInfo?.username,
        status: hubStatus.RS_OK,
        request_uuid: request_uuid,
        currency: "USD",
        balance: newBalance?.tokenBalance,
      });
      return;
    } catch (err: any) {
      logger.error(`Error processing Rollback ${err}`);
      if (err.message in hubStatus) {
        res
          .status(200)
          .json({ status: err.message, request_uuid: request_uuid, user: userInfo?.username });
        return;
      }

      res
        .status(200)
        .json({ status: "RS_ERROR_UNKNOWN", request_uuid: request_uuid, user: userInfo?.username });
    }
  },
});
