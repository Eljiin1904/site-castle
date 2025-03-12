import { Database } from "#server/services/database";
import { Notifications } from "#server/services/notifications";

export async function setDepositSent({
  transactionId,
  tradeOfferId,
}: {
  transactionId: string;
  tradeOfferId: string;
}) {
  const transaction = await Database.collection(
    "transactions",
  ).findOneAndUpdate(
    {
      _id: transactionId,
      kind: "deposit-skin",
      tradeOfferId: { $eq: null },
    },
    {
      $set: {
        tradeOfferId,
      },
    },
  );

  if (!transaction || transaction.kind !== "deposit-skin") {
    return;
  }

  await Notifications.createNotification({
    userId: transaction.user.id,
    kind: "skin-deposit-sent",
    tradeOfferId,
  });
}
