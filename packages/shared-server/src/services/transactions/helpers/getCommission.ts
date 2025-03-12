import { Affiliates } from "@core/services/affiliates";
import { UserDocument } from "@core/types/users/UserDocument";
import { Database } from "#server/services/database";

export async function getCommission({
  bettor,
  value,
}: {
  bettor: UserDocument;
  value: number;
}) {
  if (!bettor.referral) {
    return null;
  }

  const affiliate = await Database.collection("users").findOne({
    _id: bettor.referral.id,
  });

  if (!affiliate) {
    return null;
  }

  const tier = Affiliates.getEffectiveTier({
    xp: affiliate.affiliate.referralXp,
    baseTier: affiliate.affiliate.baseTier,
  });

  const { rate: commissionRate } = Affiliates.getTierInfo(tier);
  const commissionAmount = Math.round(value * commissionRate);

  return {
    commissionRate,
    commissionAmount,
  };
}
