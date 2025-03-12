import { HandledError } from "#server/services/errors";
import { Database } from "#server/services/database";
import { Transactions } from "#server/services/transactions";
import { Notifications } from "#server/services/notifications";

export async function cancelDeposit({
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

  await Transactions.cancelTransaction({ transaction });

  await Notifications.createNotification({
    userId: transaction.user.id,
    kind: "skin-deposit-cancelled",
    provider: transaction.provider,
    tokenAmount: transaction.amount,
  });
}
