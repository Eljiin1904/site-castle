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

const logger = getServerLogger({});

// TODO -> Create a Hub88
// TODO add Flag for process with Private Key
export default Http.createApiRoute({
  type: "post",
  path: "/transaction/win",
  secure: false,
  transaction: true,
  body: Validation.object({
    user: Validation.username().min(3).required("User is required."),
    transaction_uuid: Validation.string().uuid().required("Transaction UUID required"),
    supplier_transaction_id: Validation.string().required("Supplier Transaction UUID required"),
    token: Validation.string().required("Token required"),
    supplied_user: Validation.string().optional(),
    round_closed: Validation.boolean().optional(),
    round: Validation.string().optional(),
    reward_uuid: Validation.string().uuid().optional(),
    request_uuid: Validation.string().uuid().required("Request UUID is required."),

    reference_transaction_uuid: Validation.string().required("Reference Transaction UUID required"),
    is_free: Validation.boolean().optional(),
    is_supplier_promo: Validation.string().optional(),
    is_aggregated: Validation.boolean().optional(),
    game_code: Validation.string().required("Game Code required"),
    currency: Validation.string().required("Is Free Field Required"), // Convert to array to check for currency
    bet: Validation.string().optional(),
    amount: Validation.number().required("Amount Required"),
    meta: Validation.object().optional(),
  }),
  callback: async (req, res) => {
    const {
      user,
      transaction_uuid,
      supplier_transaction_id,
      token,
      supplied_user,
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

    // 1. Validate Signature Header
    const retreivedSignature = req.headers["X-Hub88-Signature"];
    if (!retreivedSignature) throw new Error(hubStatus.RS_ERROR_INVALID_SIGNATURE);

    // 2. Validate Token
    const { userDetails } = await Security.getToken({ kind: "hub-eight-token", token });
    if (!userDetails) throw new Error("RS_ERROR_INVALID_TOKEN");
    options.username = userDetails.username;

    const userInfo = await Database.collection("users").findOne(options);
    if (!userInfo) throw new Error("User not found");

    // 3. Credit the Win Amount
    const transaction = await Database.collection("transactions").findOne({
      kind: "hub-eight-credit",
      transactionUUID: transaction_uuid,
    });

    try {
      if (transaction) throw new Error("RS_ERROR_DUPLICATE_TRANSACTION");

      await Transactions.createTransaction({
        kind: "hub-eight-credit",
        user: userInfo,
        autoComplete: true,
        transactionUUID: transaction_uuid,
        supplierTransactionId: supplier_transaction_id,
        supplierUser: supplied_user,
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
