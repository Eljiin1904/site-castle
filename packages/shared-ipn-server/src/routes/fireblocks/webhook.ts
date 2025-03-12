import crypto from "crypto";
import { Request } from "express";
import { Numbers } from "@core/services/numbers";
import { FireblocksTxData, FireblocksWebhook } from "@core/types/economy/FireblocksWebhook";
import { Cryptos } from "@server/services/cryptos";
import { Database } from "@server/services/database";
import { HandledError } from "@server/services/errors";
import { Ids } from "@server/services/ids";
import { Http } from "#app/services/http";
import config from "#app/config";

// https://developers.fireblocks.com/docs/webhooks-notifications

export default Http.createRoute({
  type: "post",
  path: "/webhook",
  callback: async (req, res) => {
    res.json({});

    try {
      if (!validateRequest(req)) {
        throw new HandledError("Failed to validate fireblocks webhook.");
      }

      const { type, data }: FireblocksWebhook = req.body;

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
        console.log(`Fireblocks: ${e.message}`);
      }
      throw e;
    }
  },
});

async function handleFailedWithdraw(data: FireblocksTxData) {
  if (!data.externalTxId) {
    throw new HandledError("No externalTxId");
  }

  await Cryptos.cancelWithdraw({
    transactionId: data.externalTxId,
    cancelReason: "External IPN failure status.",
  });
}

async function handleUpdatedWithdraw(data: FireblocksTxData) {
  if (!data.externalTxId) {
    throw new HandledError("No externalTxId");
  }

  await Cryptos.completeWithdraw({
    transactionId: data.externalTxId,
    txHash: data.txHash,
  });
}

async function handleConfirmedSweep(data: FireblocksTxData) {
  const crypto = Cryptos.getInfoFromAssetId(data.assetId);
  const usdRate = await Cryptos.getRate(crypto.symbol);

  await Database.collection("crypto-sweeps").insertOne({
    _id: Ids.object(),
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
}

async function handleNewDeposit(data: FireblocksTxData, userId: string) {
  if (data.amountUSD < 0.01) {
    return; // TRX gas rebates, etc
  }
  if (!Cryptos.isValidAssetId(data.assetId)) {
    return;
  }

  const user = await Database.collection("users").findOne({ _id: userId });

  if (!user) {
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
}

async function handleUpdatedDeposit(data: FireblocksTxData, userId: string) {
  if (data.amountUSD < 0.01) {
    return; // TRX gas rebates, etc
  }
  if (!Cryptos.isValidAssetId(data.assetId)) {
    return;
  }

  await Cryptos.updateDeposit({
    externalId: data.id,
    confirmations: data.numOfConfirmations,
    completed: data.status === "COMPLETED",
  });
}

function getDepositInfo(data: FireblocksWebhook["data"]) {
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
  const signature = req.headers["fireblocks-signature"];

  if (typeof signature !== "string") {
    return false;
  }

  const verifier = crypto.createVerify("RSA-SHA512");

  verifier.write(message);
  verifier.end();

  return verifier.verify(publicKey, signature, "base64");
}

const publicKey = `-----BEGIN PUBLIC KEY-----
MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEA0+6wd9OJQpK60ZI7qnZG
jjQ0wNFUHfRv85Tdyek8+ahlg1Ph8uhwl4N6DZw5LwLXhNjzAbQ8LGPxt36RUZl5
YlxTru0jZNKx5lslR+H4i936A4pKBjgiMmSkVwXD9HcfKHTp70GQ812+J0Fvti/v
4nrrUpc011Wo4F6omt1QcYsi4GTI5OsEbeKQ24BtUd6Z1Nm/EP7PfPxeb4CP8KOH
clM8K7OwBUfWrip8Ptljjz9BNOZUF94iyjJ/BIzGJjyCntho64ehpUYP8UJykLVd
CGcu7sVYWnknf1ZGLuqqZQt4qt7cUUhFGielssZP9N9x7wzaAIFcT3yQ+ELDu1SZ
dE4lZsf2uMyfj58V8GDOLLE233+LRsRbJ083x+e2mW5BdAGtGgQBusFfnmv5Bxqd
HgS55hsna5725/44tvxll261TgQvjGrTxwe7e5Ia3d2Syc+e89mXQaI/+cZnylNP
SwCCvx8mOM847T0XkVRX3ZrwXtHIA25uKsPJzUtksDnAowB91j7RJkjXxJcz3Vh1
4k182UFOTPRW9jzdWNSyWQGl/vpe9oQ4c2Ly15+/toBo4YXJeDdDnZ5c/O+KKadc
IMPBpnPrH/0O97uMPuED+nI6ISGOTMLZo35xJ96gPBwyG5s2QxIkKPXIrhgcgUnk
tSM7QYNhlftT4/yVvYnk0YcCAwEAAQ==
-----END PUBLIC KEY-----`.replace(/\\n/g, "\n");
