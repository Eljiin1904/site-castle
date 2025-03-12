import { Database } from "#server/services/database";

export async function untrackReferral({
  affiliateId,
  userId,
}: {
  affiliateId: string;
  userId: string;
}) {
  await Database.collection("users").updateOne(
    { _id: userId },
    { $set: { referral: undefined } },
  );

  await Database.collection("affiliate-referrals").updateOne(
    {
      affiliateId,
      userId,
    },
    {
      $set: { removed: true, removeDate: new Date() },
    },
  );
}
