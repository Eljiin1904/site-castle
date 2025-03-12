import { Database } from "#server/services/database";
import { Notifications } from "#server/services/notifications";

export async function setWithdrawSent({
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
      kind: "withdraw-skin",
      tradeOfferId: { $eq: null },
    },
    {
      $set: {
        tradeOfferId,
      },
    },
  );

  if (!transaction || transaction.kind !== "withdraw-skin") {
    return;
  }

  await Notifications.createNotification({
    userId: transaction.user.id,
    kind: "skin-withdraw-sent",
    tradeOfferId,
  });
}
