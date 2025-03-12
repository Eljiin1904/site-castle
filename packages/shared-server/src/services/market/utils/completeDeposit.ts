import { HandledError } from "#server/services/errors";
import { Database } from "#server/services/database";
import { Transactions } from "#server/services/transactions";
import { Notifications } from "#server/services/notifications";

export async function completeDeposit({
  transactionId,
}: {
  transactionId: string;
}) {
  const transaction = await Database.collection("transactions").findOne({
    _id: transactionId,
    kind: "deposit-skin",
    status: "pending",
  });

  if (!transaction || transaction.kind !== "deposit-skin") {
    throw new HandledError("Failed transaction lookup.");
  }

  const user = await Database.collection("users").findOne({
    _id: transaction.user.id,
  });

  if (!user) {
    throw new HandledError("Failed user lookup.");
  }

  await Transactions.completeTransaction({
    user,
    transaction,
  });

  await Notifications.createNotification({
    userId: user._id,
    kind: "skin-deposit-confirmed",
    provider: transaction.provider,
    transactionId: transaction._id,
    tokenAmount: transaction.amount,
    ftd: !user.meta.lastDepositDate,
  });
}
