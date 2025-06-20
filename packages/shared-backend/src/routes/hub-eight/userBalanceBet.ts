import { Validation } from "@core/services/validation";
import { Database } from "@server/services/database";
import { Http } from "#app/services/http";
import { hubStatus } from "@core/services/hub-eight/HubEight";
import { currency } from "@core/services/validation/Validation";
import { getServerLogger } from "@core/services/logging/utils/serverLogger";
import { Transactions } from "@server/services/transactions";
import { Security } from "@server/services/security";

const logger = getServerLogger({});
const supportedCurrencies = ["USD", "EUR", "GBP", "JPY"];

// TODO -> Create a Hub88
// TODO add Flag for process with Private Key
export default Http.createApiRoute({
  type: "post",
  path: "/transaction/bet",
  secure: false,
  signatureRequired: "hubEight",
  transaction: true,
  body: Validation.object({
    user: Validation.username().required("User is required."),
    transaction_uuid: Validation.string().required("Transaction UUID required"),
    supplier_transaction_id: Validation.string().required("Transaction UUID required"),
    token: Validation.string().required("Token required"),
    supplier_user: Validation.string().nullable().required("Supplied User required").default(),
    round_closed: Validation.boolean().nullable().required("Round is closed"),
    round: Validation.string().nullable().required("Round required"),
    reward_uuid: Validation.string().nullable().notRequired(),
    request_uuid: Validation.string().required("Request UUID required"),

    is_free: Validation.boolean().nullable().required("Is Free Required"),
    is_supplier_promo: Validation.string().nullable().notRequired(),
    is_aggregated: Validation.boolean().nullable().notRequired(),
    game_code: Validation.string().required("Game Code required"),
    currency: Validation.string()
      .oneOf(supportedCurrencies, "Unsupported currency")
      .required("Currency is required"), // Convert to array to check for currency
    bet: Validation.string().nullable().required("Bet Field Required"),
    amount: Validation.number().required("Amount Required"),
    meta: Validation.object().nullable().notRequired(),
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

    // 1. Validate Signature Header
    // const retreivedSignature = req.headers["X-Hub88-Signature"];
    // if (!retreivedSignature) throw new Error(hubStatus.RS_ERROR_INVALID_SIGNATURE);

    // const data = Security.decrypt(,retreivedSignature)

    // 2. Validate Token
    const { userDetails } = await Security.getToken({ kind: "hub-eight-token", token });
    if (!userDetails) throw new Error("RS_ERROR_INVALID_TOKEN");
    options.username = userDetails.username;

    const userInfo = await Database.collection("users").findOne(options);
    if (!userInfo) throw new Error("User not found");

    // 3. Deduct the Bet Amount
    const transaction = await Database.collection("transactions").findOne({
      kind: "hub-eight-debit",
      transactionUUID: transaction_uuid,
    });

    try {
      if (transaction) throw new Error("RS_ERROR_DUPLICATE_TRANSACTION");

      await Transactions.createTransaction({
        kind: "hub-eight-debit",
        autoComplete: true,
        user: userInfo,
        transactionUUID: transaction_uuid,
        amount: amount,
        supplierTransactionId: supplier_transaction_id,
        roundClosed: round_closed,
        round: round,
        requestUUID: request_uuid,
        gameCode: game_code,

        meta: meta || null,
      });

      res.json({
        user: userInfo?.username,
        status: hubStatus.RS_OK,
        request_uuid: request_uuid,
        currency: "USD", // Do I always default to USD?
        balance: userInfo?.tokenBalance, // IS token balance USD?????
      });
    } catch (err: any) {
      logger.error(err);
      if (err.message in hubStatus) {
        throw new Error(err.message);
      }

      throw new Error("RS_ERROR_UNKNOWN");
    }
  },
});
