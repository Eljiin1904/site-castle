import { HandledError } from "#server/services/errors";
import { Database } from "#server/services/database";
import { Transactions } from "#server/services/transactions";
import { Notifications } from "#server/services/notifications";

export async function cancelWithdraw({
  transactionId,
  cancelReason,
}: {
  transactionId: string;
  cancelReason: string;
}) {
  const transaction = await Database.collection("transactions").findOne({
    _id: transactionId,
  });

  if (!transaction || transaction.kind !== "withdraw-skin") {
    throw new HandledError("Failed transaction lookup.");
  }

  await Transactions.cancelTransaction({
    transaction,
    cancelReason,
  });

  await Notifications.createNotification({
    userId: transaction.user.id,
    kind: "skin-withdraw-cancelled",
    provider: transaction.provider,
    tokenAmount: transaction.value,
    reason: cancelReason,
  });
}
