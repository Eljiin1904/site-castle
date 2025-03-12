import crypto from "crypto";
import { Request } from "express";
import { SwappedNotification } from "@core/types/economy/SwappedNotification";
import { Intimal } from "@core/services/intimal";
import { HandledError } from "@server/services/errors";
import { Transactions } from "@server/services/transactions";
import { Database } from "@server/services/database";
import { Cryptos } from "@server/services/cryptos";
import { Notifications } from "@server/services/notifications";
import { Http } from "#app/services/http";
import config from "#app/config";

// https://docs.swapped.com/#order-notifications

export default Http.createRoute({
  type: "post",
  path: "/notification",
  callback: async (req, res) => {
    res.json({});

    try {
      if (!validateRequest(req)) {
        throw new HandledError("Failed to validate request.");
      }

      const body: SwappedNotification = req.body;

      await handleDeposit(body);
    } catch (e) {
      if (e instanceof HandledError) {
        console.log(`Swapped: ${e.message}`);
      }
      throw e;
    }
  },
});

async function handleDeposit(data: SwappedNotification) {
  if (data.order_status !== "order_broadcasted") {
    return;
  }

  const userId = data.external_customer_id;
  const ticketId = data.external_transaction_id;
  const externalId = data.order_id;
  const txHash = data.transaction_id;
  const walletAddress = data.order_crypto_address;
  const cryptoKind = data.order_crypto;
  const cryptoAmount = Number.parseFloat(data.order_crypto_amount);

  if (config.env === "production") {
    if (cryptoKind !== "LTC") {
      throw new HandledError(`Unsupport currency, ${cryptoKind}.`);
    }
  } else {
    if (cryptoKind !== "BTC") {
      throw new HandledError(`Unsupport currency, ${cryptoKind}.`);
    }
  }

  const user = await Database.collection("users").findOne({ _id: userId });

  if (!user) {
    throw new HandledError(`Unknown userId, ${userId}.`);
  }

  const exists = await Database.exists("transactions", {
    externalId,
    kind: "deposit-swapped",
  });

  if (exists) {
    throw new HandledError("Order already completed.");
  }

  const usdAmount = parseFloat(data.order_amount_usd) || 0;
  const withFees = parseFloat(data.order_amount_usd_plus_fees) || 0;
  const feeUsdAmount = withFees - usdAmount;

  const tokenAmount = Intimal.fromDecimal(usdAmount * 2);

  const cryptoRate = await Cryptos.getRate(cryptoKind);
  const cryptoUsdValue = cryptoAmount * cryptoRate;

  const transaction = await Transactions.createTransaction({
    user,
    kind: "deposit-swapped",
    amount: tokenAmount,
    autoComplete: true,
    ticketId,
    externalId,
    walletAddress,
    txHash,
    cryptoKind,
    cryptoAmount,
    cryptoRate,
    cryptoUsdValue,
    usdAmount,
    feeUsdAmount,
  });

  await Notifications.createNotification({
    userId: user._id,
    kind: "swapped-deposit",
    transactionId: transaction._id,
    tokenAmount: transaction.value,
    ftd: !user.meta.lastDepositDate,
  });
}

function validateRequest(req: Request) {
  const secretKey = config.swappedSecret;
  const signature = crypto
    .createHmac("sha256", secretKey)
    .update(JSON.stringify(req.body))
    .digest("base64");

  return signature === req.headers?.signature;
}
