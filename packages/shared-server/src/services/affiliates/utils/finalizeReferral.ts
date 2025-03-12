import { TransactionDocument } from "@core/types/transactions/TransactionDocument";
import { Database } from "#server/services/database";
import { Users } from "#server/services/users";
import { trackReferral } from "./trackReferral";
import { untrackReferral } from "./untrackReferral";

export async function finalizeReferral(tx: TransactionDocument) {
  if (!tx.affiliate?.pending) {
    return;
  }

  const user = await Database.collection("users").findOne({
    _id: tx.user.id,
  });

  if (!user) {
    return;
  }

  const affiliate = await Database.collection("users").findOne({
    _id: tx.affiliate.id,
  });

  if (!affiliate) {
    return;
  }

  if (user.referral) {
    await untrackReferral({
      userId: user._id,
      affiliateId: user.referral.id,
    });
  }

  await trackReferral({
    user,
    affiliate: Users.getBasicUser(affiliate),
  });

  await Database.collection("users").updateOne(
    { _id: user._id },
    {
      $unset: { "meta.pendingReferralCode": true },
    },
  );
}
