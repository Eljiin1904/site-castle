import { Transactions } from "#server/services/transactions";
import { Notifications } from "#server/services/notifications";
import { Database } from "#server/services/database";
import { HandledError } from "#server/services/errors";

export async function updateDeposit({
  externalId,
  confirmations,
  completed,
}: {
  externalId: string;
  confirmations: number;
  completed: boolean;
}) {
  const transaction = await Database.collection(
    "transactions",
  ).findOneAndUpdate({ externalId }, { $set: { confirmations } });

  if (!transaction || transaction.kind !== "deposit-crypto") {
    throw new HandledError("Transaction not found.");
  }

  if (!completed && confirmations !== transaction.requiredConfirmations) {
    return;
  }

  const { modifiedCount } = await Database.collection("transactions").updateOne(
    {
      _id: transaction._id,
      status: "pending",
    },
    {
      $set: {
        status: "processing",
      },
    },
  );

  if (modifiedCount === 0) {
    return;
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
