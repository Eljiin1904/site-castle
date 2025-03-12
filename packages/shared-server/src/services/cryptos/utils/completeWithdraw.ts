import { Database } from "#server/services/database";
import { HandledError } from "#server/services/errors";
import { Notifications } from "#server/services/notifications";
import { Transactions } from "#server/services/transactions";

export async function completeWithdraw({
  transactionId,
  txHash,
}: {
  transactionId: string;
  txHash: string;
}) {
  const transaction = await Database.collection(
    "transactions",
  ).findOneAndUpdate(
    {
      _id: transactionId,
      status: "processing",
    },
    {
      $set: {
        txHash,
      },
    },
  );

  if (!transaction || transaction.kind !== "withdraw-crypto") {
    throw new HandledError("Failed transaction lookup.");
  }

  const user = await Database.collection("users").findOne({
    _id: transaction.user.id,
  });

  if (!user) {
    throw new HandledError("Failed user lookup.");
  }

  await Transactions.completeTransaction({ transaction, user });

  await Notifications.createNotification({
    userId: user._id,
    kind: "crypto-withdraw-sent",
    transactionId: transaction._id,
    cryptoKind: transaction.cryptoKind,
    cryptoAmount: transaction.cryptoAmount,
    tokenAmount: transaction.value,
  });
}
