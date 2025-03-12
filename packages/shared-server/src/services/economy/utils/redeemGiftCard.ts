import { GiftCardDocument } from "@core/types/economy/GiftCardDocument";
import { UserDocument } from "@core/types/users/UserDocument";
import { UserLocation } from "@core/types/users/UserLocation";
import { Database } from "#server/services/database";
import { HandledError } from "#server/services/errors";
import { Transactions } from "#server/services/transactions";
import { Users } from "#server/services/users";

export async function redeemGiftCard({
  card,
  user,
  location,
}: {
  card: GiftCardDocument;
  user: UserDocument;
  location: UserLocation;
}) {
  const updateResult = await Database.collection("gift-cards").updateOne(
    {
      _id: card._id,
      used: { $exists: false },
    },
    {
      $set: {
        used: true,
        user: Users.getBasicUser(user),
        useLocation: location,
        useDate: new Date(),
      },
    },
  );

  if (updateResult.modifiedCount !== 1) {
    throw new HandledError("Failed to redeem gift card.");
  }

  await Database.collection("gift-batches").updateOne(
    { _id: card.batchId },
    {
      $inc: { usedCount: 1 },
      $set: { lastUseDate: new Date() },
    },
  );

  const transaction = await Transactions.createTransaction({
    user,
    autoComplete: true,
    kind:
      card.tag === "giveaway" ? "promotion-card-redeem" : "deposit-gift-card",
    amount: card.tokenAmount,
    batchId: card.batchId,
    cardId: card._id,
    tag: card.tag,
  });

  return transaction;
}
