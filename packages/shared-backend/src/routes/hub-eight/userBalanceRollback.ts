import { Validation } from "@core/services/validation";
import { Database } from "@server/services/database";
import { Http } from "#app/services/http";
import { hubStatus } from "@core/services/hub-eight/HubEight";
import { currency } from "@core/services/validation/Validation";
import { Transactions } from "@server/services/transactions";
import { getServerLogger } from "@core/services/logging/utils/serverLogger";
import { Security } from "@server/services/security";

const logger = getServerLogger({});

// TODO -> Create a Hub88
// TODO add Flag for process with Private Key
export default Http.createApiRoute({
  type: "post",
  path: "/transaction/rollback",
  secure: false,
  transaction: false,
  externalTransaction: true,
  externalTransactionType: "hub-eight",
  body: Validation.object({
    user: Validation.username().required("User is required."),
    transaction_uuid: Validation.string().required("Transaction UUID required"),
    supplier_transaction_id: Validation.string().required("Transaction UUID required"),
    token: Validation.string().required("Token required"),
    round_closed: Validation.boolean().nullable().required("Round closed required"),
    round: Validation.string().nullable().required("Round required"),
    request_uuid: Validation.string().required("Request UUID required"),
    reference_transaction_uuid: Validation.string().required("Reference Transaction UUID required"),
    game_code: Validation.string().required("Game Code required"),
    meta: Validation.object().nullable().notRequired(),
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

    // // 1. Validate Signature Header
    // const retreivedSignature = req.headers["X-Hub88-Signature"];
    // if (!retreivedSignature) throw new Error(hubStatus.RS_ERROR_INVALID_SIGNATURE);

    // 2. Validate Token
    const { userDetails } = await Security.getToken({ kind: "hub-eight-token", token });
    if (!userDetails) throw new Error("RS_ERROR_INVALID_TOKEN");
    options.username = userDetails.username;

    const userInfo = await Database.collection("users").findOne(options);
    if (!userInfo) throw new Error("User not found");
    // 3. Check for previous roll back
    const previousRollbackTransaction = await Database.collection("transactions").findOne({
      kind: "hub-eight-rollback",
      transactionUUID: reference_transaction_uuid,
    });
    if (previousRollbackTransaction) {
      res.status(200).json("RS_ERROR_DUPLICATE_TRANSACTION");
      return;
    }
    // 4. Credit the Previous Bet Amount
    const transaction = await Database.collection("transactions").findOne({
      transactionUUID: reference_transaction_uuid,
    });

    try {
      if (!transaction) {
        res.status(200).json("RS_ERROR_TRANSACTION_DOES_NOT_EXIST");
        return;
      }

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
        amount: transaction.amount,
        transactionId: transaction._id,
        username: userInfo.username,
        referenceTransactionUUID: reference_transaction_uuid,
      });

      const newBalance = await Database.collection("users").findOne(options);

      res.json({
        user: userInfo?.username,
        status: hubStatus.RS_OK,
        request_uuid: request_uuid,
        currency: "USD", // Do I always default to USD?
        balance: newBalance?.tokenBalance, // IS token balance USD?????
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
