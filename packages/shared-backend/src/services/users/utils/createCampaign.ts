import { HandledError } from "@server/services/errors";
import { Database } from "@server/services/database";
import { UserCampaigns } from "@core/types/users/UserCampaigns";
import { Ids } from "@server/services/ids";

export async function createCampaign(
  userId: string,
  campaignId: string,
  campaignName: string,
  defaultCampaign: boolean,
) {
  const dbCampaignId = campaignId;

  const user = await Database.collection("users").findOne({
    _id: userId,
  });
  if (!user) {
    throw new HandledError("User does not exists");
  }

  const campaign = await Database.collection("user-campaigns").findOne({
    campaignId: dbCampaignId,
  });

  if (campaign) {
    throw new HandledError("Campaign already exists");
  }

  const userCampaign: UserCampaigns = {
    _id: Ids.object(),
    timestamp: new Date(),
    userId: user._id,
    campaignId: dbCampaignId,
    campaignName: campaignName,
    commissionRate: 0.1,
    commissionTotal: 0,
    totalDeposit: 0,
    campaignTier: 1,
    campaignHits: 0,
    commissionBalance: 0,
    referralCount: 0,
    referralXp: 0,
    default: defaultCampaign,
  };

  const userCampaignDB = await Database.collection("user-campaigns").insertOne(userCampaign);
  return userCampaignDB;
}
