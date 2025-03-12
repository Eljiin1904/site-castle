import { Transactions } from "#server/services/transactions";
import { Notifications } from "#server/services/notifications";
import { Database } from "#server/services/database";
import { HandledError } from "#server/services/errors";

export async function confirmDeposit({
  transactionId,
}: {
  transactionId: string;
}) {
  const transaction = await Database.collection(
    "transactions",
  ).findOneAndUpdate(
    {
      _id: transactionId,
      status: "pending",
    },
    {
      $set: {
        status: "processing",
      },
    },
  );

  if (!transaction || transaction.kind !== "deposit-crypto") {
    throw new HandledError("Invalid transaction.");
  }

  const user = await Database.collection("users").findOne({
    _id: transaction.user.id,
  });

  if (!user) {
    return;
  }

  await Transactions.completeTransaction({
    user,
    transaction,
  });

  await Notifications.createNotification({
    userId: user._id,
    kind: "crypto-deposit-confirmed",
    transactionId: transaction._id,
    cryptoKind: transaction.cryptoKind,
    cryptoAmount: transaction.cryptoAmount,
    tokenAmount: transaction.amount,
    ftd: !user.meta.lastDepositDate,
  });
}
