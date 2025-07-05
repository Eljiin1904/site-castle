import { Validation } from "@core/services/validation";
import { Database } from "@server/services/database";
import { Http } from "#app/services/http";
import { hubStatus } from "@core/services/hub-eight/HubEight";
import { getServerLogger } from "@core/services/logging/utils/serverLogger";
import { Transactions } from "@server/services/transactions";
import { Security } from "@server/services/security";
import config from "@server/config";
import { validateSignature } from "./utils/validateSignature";

const logger = getServerLogger({});
const supportedCurrencies = ["USD", "EUR", "GBP", "JPY"];

// TODO -> Create a Hub88
// TODO add Flag for process with Private Key
export default Http.createApiRoute({
  type: "post",
  path: "/transaction/bet",
  secure: false,
  transaction: false,
  externalTransaction: true,
  externalTransactionType: "hub-eight",
  signatureRequired: true,
  body: Validation.object({
    user: Validation.username().required("User is required."),
    transaction_uuid: Validation.string().required("Transaction UUID required"),
    supplier_transaction_id: Validation.string().required("Transaction UUID required"),
    token: Validation.string().required("Token required"),
    supplier_user: Validation.string().nullable().default(null),
    round_closed: Validation.boolean().nullable().default(null),
    round: Validation.string().nullable().default(null),
    reward_uuid: Validation.string().nullable().notRequired(),
    request_uuid: Validation.string().required("Request UUID required"),

    is_free: Validation.boolean().nullable().default(null),
    is_supplier_promo: Validation.string().nullable().notRequired(),
    is_aggregated: Validation.boolean().nullable().default(null),
    game_code: Validation.string().required("Game Code required"),
    currency: Validation.string()
      .oneOf(supportedCurrencies, "Unsupported currency")
      .required("Currency is required"), // Convert to array to check for currency
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

    logger.info(`Bet Payload Received from Hubb88: ${JSON.stringify(req.body)} `);

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
      res.status(200).json({ status: "RS_ERROR_INVALID_TOKEN", request_uuid: request_uuid });
      return;
    }

    const userInfo = await Database.collection("users").findOne(options);
    if (!userInfo) {
      res.status(200).json({ status: "RS_ERROR_INVALID_PARTNER", request_uuid: request_uuid });
      return;
    }

    if (amount < 0) {
      res.status(200).json({
        status: "RS_ERROR_WRONG_TYPES",
        request_uuid: request_uuid,
        user: userInfo?.username,
      });
      return;
    }

    if (userInfo.tokenBalance < amount) {
      res.status(200).json({
        status: "RS_ERROR_NOT_ENOUGH_MONEY",
        request_uuid: request_uuid,
        user: userInfo?.username,
      });
      return;
    }

    // 3. Deduct the Bet Amount
    const previousBetTransaction = await Database.collection("transactions").findOne({
      kind: "hub-eight-debit",
      transactionUUID: transaction_uuid,
    });

    try {
      // Duplicate Checks -> For sure same transaction uuid if found.

      // Idempotent Bet Check -> Process the first bet only
      // If same exact request -> Transaction uuid,round etc. Process first win only
      if (previousBetTransaction && previousBetTransaction.kind == "hub-eight-debit") {
        if (previousBetTransaction.round == round) {
          logger.error(
            `Bet was already made for User: ${userInfo.username}, Transaction: ${previousBetTransaction.transactionUUID}, Request Id ${previousBetTransaction.requestUUID} , Round Id ${previousBetTransaction.round} `,
          );
          res.status(200).json({
            status: "RS_OK",
            request_uuid: request_uuid,
            user: userInfo?.username,
            balance: userInfo.tokenBalance,
            currency: "USD",
          });
          return;
        }

        // Duplicate Bet Check -> Same Transaction UUID but different details
        if (
          previousBetTransaction.round != round ||
          previousBetTransaction.roundClosed != round_closed
        ) {
          logger.error(
            `Bet was already made for User: ${userInfo.username}, Transaction: ${previousBetTransaction.transactionUUID}, Request Id ${previousBetTransaction.requestUUID}, Previous Round Id ${previousBetTransaction.round}, Current Round Id ${round} `,
          );
          res.status(200).json({
            status: "RS_ERROR_DUPLICATE_TRANSACTION",
            request_uuid: request_uuid,
            user: userInfo?.username,
            balance: userInfo.tokenBalance,
            currency: "USD",
          });
          return;
        }
      }

      await Transactions.createTransaction({
        kind: "hub-eight-debit",
        autoComplete: true,
        user: userInfo,
        transactionUUID: transaction_uuid,
        amount: -amount,
        supplierTransactionId: supplier_transaction_id,
        roundClosed: round_closed,
        round: round,
        requestUUID: request_uuid,
        gameCode: game_code,

        meta: meta || null,
      });
      const newBalance = await Database.collection("users").findOne(options);

      res.json({
        user: userInfo?.username,
        status: hubStatus.RS_OK,
        request_uuid: request_uuid,
        currency: "USD", // It was discussed to use USD
        balance: newBalance?.tokenBalance,
      });
      return;
    } catch (err: any) {
      logger.error(err);
      if (err.message in hubStatus) {
        res.status(200).json({
          status: err.message,
          request_uuid: request_uuid,
          user: userInfo?.username,
        });
        return;
      }

      res
        .status(200)
        .json({ status: "RS_ERROR_UNKNOWN", request_uuid: request_uuid, user: userInfo?.username });
    }
  },
});
