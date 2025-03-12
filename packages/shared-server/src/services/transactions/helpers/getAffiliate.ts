import { Affiliates } from "@core/services/affiliates";
import { UserDocument } from "@core/types/users/UserDocument";
import { TransactionAffiliate } from "@core/types/transactions/TransactionAffiliate";
import { Database } from "#server/services/database";
import { TransactionCategory } from "@core/types/transactions/TransactionCategory";

export async function getAffiliate({
  category,
  user,
}: {
  category: TransactionCategory;
  user: UserDocument;
}): Promise<TransactionAffiliate | null> {
  let affiliate;
  let pending;

  if (category === "deposits" && user.meta.pendingReferralCode) {
    affiliate = await Database.collection("users").findOne(
      { username: user.meta.pendingReferralCode },
      {
        collation: { locale: "en", strength: 2 },
      },
    );
    pending = true;
  } else if (user.referral) {
    affiliate = await Database.collection("users").findOne({
      _id: user.referral.id,
    });
  }

  if (!affiliate) {
    return null;
  }

  const tier = Affiliates.getEffectiveTier({
    xp: affiliate.affiliate.referralXp,
    baseTier: affiliate.affiliate.baseTier,
  });

  return {
    id: affiliate._id,
    name: affiliate.username,
    role: affiliate.role,
    tags: affiliate.tags,
    tier,
    pending,
  };
}
