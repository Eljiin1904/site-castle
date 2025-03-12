import { Database } from "#server/services/database";
import { HandledError } from "#server/services/errors";
import { Notifications } from "#server/services/notifications";
import { Transactions } from "#server/services/transactions";

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

  if (!transaction || transaction.kind !== "withdraw-crypto") {
    throw new HandledError("Failed transaction lookup.");
  }

  await Transactions.cancelTransaction({
    transaction,
    cancelReason,
  });

  await Notifications.createNotification({
    userId: transaction.user.id,
    kind: "crypto-withdraw-cancelled",
    cryptoKind: transaction.cryptoKind,
    cryptoAmount: transaction.cryptoAmount,
    tokenAmount: transaction.value,
  });
}
