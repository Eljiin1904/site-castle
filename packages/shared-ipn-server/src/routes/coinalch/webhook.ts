import crypto from "crypto";
import { Request } from "express";
import { Numbers } from "@core/services/numbers";
import { CoinAlchTxData, CoinAlchWebhook } from "@core/types/economy/CoinAlchWebhook";
import { Cryptos } from "@server/services/cryptos";
import { Database } from "@server/services/database";
import { HandledError } from "@server/services/errors";
import { Ids } from "@server/services/ids";
import { Http } from "#app/services/http";
import config from "#app/config";
import { getServerLogger } from "@core/services/logging/utils/serverLogger";
import { LOG_MODULE_CONSTANTS } from "@core/services/logging/constants/LogConstant";

const logger = getServerLogger({ module: LOG_MODULE_CONSTANTS.LOG_SHARED_IPN_SERVER });
export default Http.createRoute({
  type: "post",
  path: "/webhook",
  callback: async (req, res) => {
    res.json({});

    try {
      if (!validateRequest(req)) {
        throw new HandledError("Failed to validate coinalch webhook.");
      }

      const { type, data }: CoinAlchWebhook = req.body;

      // Withdraws
      // => note: "Withdraw_environment_userId"
      if (data?.note?.startsWith("Withdraw_")) {
        if (data.note.split("_")[1] !== config.env) {
          return;
        }
        if (type === "TRANSACTION_STATUS_UPDATED") {
          if (data.status === "FAILED") {
            await handleFailedWithdraw(data);
          } else if (["CONFIRMING", "COMPLETED"].includes(data.status)) {
            await handleUpdatedWithdraw(data);
          }
        }
      }

      // Sweeps
      // => note: "Sweep_environment"
      else if (data?.note?.startsWith("Sweep_")) {
        if (data.note.split("_")[1] !== config.env) {
          return;
        }
        if (type === "TRANSACTION_STATUS_UPDATED") {
          if (data.subStatus === "CONFIRMED") {
            await handleConfirmedSweep(data);
          }
        }
      }

      // Ignore the Gas Station
      else if (data?.source?.id === config.fireblocksGasStationId) {
        // ignore
      }

      // Deposits
      // => uxto addressDescription: "UserDeposit_environment_userId"
      // => account vault id: "UserDeposit_environment_userId"
      else {
        const { env, userId } = getDepositInfo(data);
        if (!userId || env !== config.env) {
          return;
        }
        if (type === "TRANSACTION_CREATED") {
          await handleNewDeposit(data, userId);
        } else if (type === "TRANSACTION_STATUS_UPDATED") {
          await handleUpdatedDeposit(data, userId);
        }
      }
    } catch (e) {
      if (e instanceof HandledError) {
        console.log(`Coinalch: ${e.message}`);
      }
      throw e;
    }
  },
});

async function handleFailedWithdraw(data: CoinAlchTxData) {
  if (!data.externalTxId) {
    logger.error("No externalTxId");
    throw new HandledError("No externalTxId");
  }
  logger.error(`Transaction ${data.externalTxId}, withdraw failed`);
  await Cryptos.cancelWithdraw({
    transactionId: data.externalTxId,
    cancelReason: "External IPN failure status.",
  });
}

async function handleUpdatedWithdraw(data: CoinAlchTxData) {
  if (!data.externalTxId) {
    throw new HandledError("No externalTxId");
  }
  logger.info(`Transaction ${data.externalTxId}, updated withdraw`);

  await Cryptos.completeWithdraw({
    transactionId: data.externalTxId,
    txHash: data.txHash,
  });
}

async function handleConfirmedSweep(data: CoinAlchTxData) {
  const crypto = Cryptos.getInfoFromAssetId(data.assetId);
  const usdRate = await Cryptos.getRate(crypto.symbol);
  const id = Ids.object();
  await Database.collection("crypto-sweeps").insertOne({
    _id: id,
    timestamp: new Date(),
    sourceAddress: data.sourceAddress,
    destinationAddress: data.destinationAddress,
    txHash: data.txHash,
    cryptoSymbol: crypto.symbol,
    cryptoKind: crypto.kind,
    usdRate,
    cryptoAmount: data.amount,
    usdAmount: Numbers.floor(data.amount * usdRate, 2),
    feeAmount: data.networkFee,
    feeUsdAmount: Numbers.floor(data.networkFee * usdRate, 2),
  });
  logger.info(`Id ${id}, sweep inserted`);
}

async function handleNewDeposit(data: CoinAlchTxData, userId: string) {
  if (data.amountUSD < 0.01) {
    return; // TRX gas rebates, etc
  }
  if (!Cryptos.isValidAssetId(data.assetId)) {
    return;
  }

  const user = await Database.collection("users").findOne({ _id: userId });

  if (!user) {
    logger.info(`Unable to deposit, for user -> ${userId}, user not found`);
    throw new HandledError("Unknown user id.");
  }

  await Cryptos.createDeposit({
    user,
    externalId: data.id,
    sourceAddress: data.sourceAddress,
    destinationAddress: data.destinationAddress,
    txHash: data.txHash,
    assetId: data.assetId,
    cryptoAmount: data.amount,
    feeAmount: data.networkFee,
  });
  logger.info(`Deposit created, Id -> ${data.id}`);
}

async function handleUpdatedDeposit(data: CoinAlchTxData, userId: string) {
  if (data.amountUSD < 0.01) {
    return; // TRX gas rebates, etc
  }
  if (!Cryptos.isValidAssetId(data.assetId)) {
    logger.error(`Invalid Asset Id -> ${data.assetId} `);

    return;
  }

  await Cryptos.updateDeposit({
    externalId: data.id,
    confirmations: data.numOfConfirmations,
    completed: data.status === "COMPLETED",
  });
}

function getDepositInfo(data: CoinAlchWebhook["data"]) {
  let walletId;

  if (data?.destination?.id === config.fireblocksOmnibusId) {
    walletId = data.destinationAddressDescription;
  } else if (data?.destination?.name.startsWith("UserDeposit_")) {
    walletId = data.destination.name;
  }

  const splits = (walletId || "").split("_");

  return {
    env: splits[1],
    userId: splits[2],
  };
}

function validateRequest(req: Request) {
  const message = JSON.stringify(req.body);
  const signature = req.headers["coinalch-signature"];

  if (typeof signature !== "string") {
    return false;
  }

  const verifier = crypto.createVerify("RSA-SHA512");

  verifier.write(message);
  verifier.end();

  return verifier.verify(publicKey, signature, "base64");
}

const publicKey = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAupe8tjDQI1/td/FosQ3D
hxTnyIKAW8wY6IQ/xTQziUEl5SHPz075StisFhsFAsq0UgDUfyKhJjmmIVg48BoL
qDARq1VFy4XE5GufOfZwZLFL8y9EuJICOkanyGPKD4BaNfJHXzFGp8BEivz9Daao
PKxnSVIObkZMhhFyzRu59FII0yu/PFnRWxEdztGsCFP9agBCsBIOXjnZac7wPTE4
3sLxyGZSZDTnX0e5AQuEN4Rxkk3qtQFrkEAGimhKNXYCTTYqyPg4eiMAlqZ9/SK0
rAf3xeNrFoji5VnCJsRcZ0g06lug/fCu+UdvSxktEtQfuH/gSQNBY1NYkWcHT+aA
WQIDAQAB
-----END PUBLIC KEY-----`.replace(/\\n/g, "\n");
