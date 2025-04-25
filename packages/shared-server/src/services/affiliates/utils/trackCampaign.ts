import { UserReferral } from "@core/types/users/UserReferral";
import { UserDocument } from "@core/types/users/UserDocument";
import { Database } from "#server/services/database";
import { Ids } from "#server/services/ids";
import { UserCampaigns } from "@core/types/users/UserCampaigns";
import { Users } from "#server/services/users";

export async function trackCampaign({
  user,
  affiliate,
}: {
  user: UserDocument;
  affiliate: UserCampaigns;
}) {
  const userId = user._id;
  const affiliateId = affiliate._id;
  const campaignOwner = await Database.collection("users").findOne({ _id: affiliate.userId });

  if (!campaignOwner) {
    return;
  }

  const exists = await Database.exists("affiliate-referrals", {
    userId,
    affiliateId,
  });

  if (exists) {
    return;
  }

  const referral: UserReferral = {
    ...Users.getBasicUser(campaignOwner),
    campaignId: affiliateId,
    timestamp: new Date(),
  };

  user.referral = referral;

  await Database.collection("users").updateOne({ _id: userId }, { $set: { referral } });

  await Database.collection("affiliate-referrals").insertOne({
    _id: Ids.object(),
    timestamp: new Date(),
    userId,
    affiliateId,
  });

  await Database.collection("user-campaigns").updateOne(
    { _id: affiliateId },
    { $inc: { referralCount: 1 } },
  );
}
