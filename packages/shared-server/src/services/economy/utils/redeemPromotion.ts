import { PromotionCodeDocument } from "@core/types/economy/PromotionCodeDocument";
import { UserDocument } from "@core/types/users/UserDocument";
import { UserLocation } from "@core/types/users/UserLocation";
import { Database } from "#server/services/database";
import { HandledError } from "#server/services/errors";
import { Transactions } from "#server/services/transactions";
import { Ids } from "#server/services/ids";

export async function redeemPromotion({
  promotion,
  user,
  location,
}: {
  promotion: PromotionCodeDocument;
  user: UserDocument;
  location: UserLocation;
}) {
  const { modifiedCount } = await Database.collection(
    "promotion-codes",
  ).updateOne(
    {
      _id: promotion._id,
      uses: { $lt: promotion.maxUses },
    },
    { $inc: { uses: 1 } },
  );

  if (modifiedCount !== 1) {
    throw new HandledError("Promotion has already completed.");
  }

  await Database.collection("promotion-tickets").insertOne({
    _id: Ids.object(),
    timestamp: new Date(),
    userId: user._id,
    promotionId: promotion._id,
    ip: location.ip,
  });

  await Transactions.createTransaction({
    user,
    autoComplete: true,
    kind: "promotion-code-redeem",
    amount: promotion.tokenAmount,
    location,
    promotionId: promotion._id,
  });

  return promotion;
}
