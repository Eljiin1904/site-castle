import { TransactionDocument } from "@core/types/transactions/TransactionDocument";
import { Database } from "#server/services/database";
import { trackCampaign } from "./trackCampaign";

export async function finalizeCampaignReferral(tx: TransactionDocument) {
  if (!tx.affiliate?.pending) {
    return;
  }

  const user = await Database.collection("users").findOne({
    _id: tx.user.id,
  });

  if (!user) {
    return;
  }

  if (!tx.referer || tx.referer.kind != "campaign") return;
  const affiliate = await Database.collection("user-campaigns").findOne({
    _id: tx.referer.id,
  });

  if (!affiliate) {
    return;
  }

  if (user.referral) {
    return;
  }

  await trackCampaign({
    user,
    affiliate,
  });

  await Database.collection("users").updateOne(
    { _id: user._id },
    {
      $unset: { "meta.pendingReferralCode": true },
    },
  );
}
