import { Validation } from "@core/services/validation";
import { Database } from "@server/services/database";
import { Http } from "#app/services/http";
import { hubStatus } from "@core/services/hub-eight/HubEight";
import { TransactionDocument } from "@core/types/transactions/TransactionDocument";
import { getServerLogger } from "@core/services/logging/utils/serverLogger";
import { Ids } from "@server/services/ids";
// import { Transaction } from "ethers";
import { Transactions } from "@server/services/transactions";
import { Security } from "@server/services/security";
import config from "@server/config";
import { validateSignature } from "./utils/validateSignature";

const logger = getServerLogger({});
const supportedCurrencies = ["USD", "EUR", "GBP", "JPY"];

export default Http.createApiRoute({
  type: "post",
  path: "/transaction/win",
  secure: false,
  signatureRequired: true,
  body: Validation.object({
    user: Validation.username().min(3).required("User is required."),
    transaction_uuid: Validation.string().uuid().required("Transaction UUID required"),
    supplier_transaction_id: Validation.string().required("Supplier Transaction UUID required"),
    token: Validation.string().required("Token required"),
    supplier_user: Validation.string().nullable().default(null),
    round_closed: Validation.boolean().nullable().default(null),
    round: Validation.string().nullable().default(null),
    reward_uuid: Validation.string().uuid().nullable().notRequired(),
    request_uuid: Validation.string().uuid().required("Request UUID is required."),

    reference_transaction_uuid: Validation.string().required("Reference Transaction UUID required"),
    is_free: Validation.boolean().nullable().default(null),
    is_supplier_promo: Validation.boolean().optional(),
    is_aggregated: Validation.boolean().nullable().notRequired(),
    game_code: Validation.string().required("Game Code required"),
    currency: Validation.string()
      .oneOf(supportedCurrencies, "Unsupported currency")
      .required("Currency is required"),
    bet: Validation.string().nullable().default(null),
    amount: Validation.number().required("Amount Required"),
    meta: Validation.object().nullable().default(null),
  }),
  callback: async (req, res) => {
    const {
      user,
      transaction_uuid,
      supplier_transaction_id,
      token,
      supplier_user,
      round_closed,
      round,
      reward_uuid,
      request_uuid,

      reference_transaction_uuid,
      is_free,
      is_supplier_promo,
      is_aggregated,
      game_code,
      currency,
      bet,
      amount,
      meta,
    } = req.body;
    const options: any = {};
    const { hubEightPublicKey } = config;

    logger.info(`Win Payload Received from Hubb88:  ${JSON.stringify(req.body)} `);

    // 1. Validate Signature Header
    if (!validateSignature(req, "x-hub88-signature", hubEightPublicKey)) {
      res.status(200).json({
        status: "RS_ERROR_INVALID_SIGNATURE",
        request_uuid,
      });
      return;
    }

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

    const userInfo = await Database.collection("users").findOne(options);
    if (!userInfo) {
      res.status(200).json({ status: "RS_ERROR_INVALID_PARTNER", request_uuid: request_uuid });
      return;
    }

    logger.info(
      `Retreived User: ${userInfo.username}, Transaction UUID: ${transaction_uuid}, Reference Transaction: ${reference_transaction_uuid}, Request Id ${request_uuid} `,
    );

    // 3. Check if bet was made or if it was rolled back
    const betTransaction = await Database.collection("transactions").findOne({
      kind: "hub-eight-debit",
      transactionUUID: reference_transaction_uuid,
    });

    const previousRollbackTransaction = await Database.collection("transactions").findOne({
      kind: "hub-eight-rollback",
      referenceTransactionUUID: reference_transaction_uuid,
    });

    // If No bet was made, dont provide win
    // If bet was rolled back, dont provide win
    if (!betTransaction || previousRollbackTransaction) {
      if (!betTransaction)
        logger.error(
          `In Win, previous Bet was not found for User: ${userInfo.username} with Transaction UUID: ${transaction_uuid}, Reference Transaction: ${reference_transaction_uuid}, Request Id ${request_uuid} `,
        );

      if (previousRollbackTransaction && previousRollbackTransaction.kind == "hub-eight-rollback")
        logger.error(
          `In Win, transaction was already rolled back for User: ${userInfo.username}, Reference Transaction: ${reference_transaction_uuid}, Request Id ${previousRollbackTransaction.requestUUID} `,
        );

      res.status(200).json({
        status: "RS_ERROR_TRANSACTION_DOES_NOT_EXIST",
        request_uuid: request_uuid,
        user: userInfo?.username,
      });
      return;
    }

    // 4. Credit the Win Amount
    const previousWinTransaction = await Database.collection("transactions").findOne({
      kind: "hub-eight-credit",
      referenceTransactionUUID: reference_transaction_uuid,
    });

    try {
      // Duplicate Checks -> For sure same transaction uuid if found.
      if (previousWinTransaction?.kind === "hub-eight-credit") {
        const { transactionUUID, referenceTransactionUUID } = previousWinTransaction;

        const responseBase = {
          request_uuid,
          user: userInfo?.username,
          balance: userInfo.tokenBalance,
          currency: "USD",
        };

        // Idempotent Win Check -> Process the first win only
        // Criteria 1: If transaction uuid match a previous
        // Return OK
        if (
          transactionUUID === transaction_uuid &&
          previousWinTransaction.round == round &&
          previousWinTransaction.amount == amount
        ) {
          logger.error(
            `Win was already processed for User: ${userInfo.username}, Reference Transaction: ${reference_transaction_uuid}, Request Id ${previousWinTransaction.requestUUID}, contains same Transaction UUID, round and amount `,
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
            `Win was already processed for User: ${userInfo.username} for  Reference Transaction: ${reference_transaction_uuid} but with a different Transaction UUID, Previous Win Transaction UUID ${transactionUUID} and Current Transaction UUID ${transaction_uuid}, returning current balance  `,
          );
          res.status(200).json({ status: "RS_OK", ...responseBase });
          return;
        }

        // Criteria 3 : If reference transaction uuid match a previous win
        // Return Duplicate Transaction
        if (referenceTransactionUUID === reference_transaction_uuid) {
          logger.error(
            `Win was already processed for User: ${userInfo.username} with the same Reference Transaction: ${reference_transaction_uuid} that was previously utilized `,
          );
          res.status(200).json({ status: "RS_ERROR_DUPLICATE_TRANSACTION", ...responseBase });
          return;
        }
      }

      // 5. Credit the Win Amount
      await Transactions.createTransaction({
        kind: "hub-eight-credit",
        user: userInfo,
        autoComplete: true,
        transactionUUID: transaction_uuid,
        supplierTransactionId: supplier_transaction_id,
        supplierUser: supplier_user,
        roundClosed: round_closed,
        round: round,
        rewardUUID: reward_uuid,
        requestUUID: request_uuid,
        referenceTransactionUUID: reference_transaction_uuid,
        isFree: is_free,
        isSupplierPromo: is_supplier_promo,
        isAggregated: is_aggregated,
        gameCode: game_code,
        currency: currency,
        betData: bet,
        amount: amount,
        meta: meta,
      });

      // 6. Return OK response
      const newBalance = await Database.collection("users").findOne(options);

      res.json({
        user: userInfo?.username,
        status: hubStatus.RS_OK,
        request_uuid: request_uuid,
        currency: "USD", // Confirmed always USD
        balance: newBalance?.tokenBalance,
      });
      return;
    } catch (err: any) {
      // Handle Errors
      logger.error(`Error process Win Transaction due to Error ${err}`);
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
