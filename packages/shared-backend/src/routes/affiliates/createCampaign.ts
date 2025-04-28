import { Validation } from "@core/services/validation";
import { HandledError } from "@server/services/errors";
import { Http } from "#app/services/http";
import { Site } from "#app/services/site";
import { UserCampaigns } from "@core/types/users/UserCampaigns";
import { Database } from "@server/services/database";
import { Ids } from "@server/services/ids";

export default Http.createApiRoute({
  type: "post",
  path: "/create-campaign",
  secure: true,
  body: Validation.object({
    campaignName: Validation.string().required("Campaign Name is required").min(5).max(64).trim(),
    campaignId: Validation.campaignId(),
  }),
  callback: async (req, res) => {
    const user = req.user;
    const { campaignName, campaignId } = req.body;

    await Site.validateToggle("affiliatesEnabled");
    const dbCampaignId = campaignId;
    const campaign = await Database.collection("user-campaigns").findOne({
      campaignId: dbCampaignId,
    });

    if (campaign) {
      throw new HandledError("validations:errors.campaign.exists");
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
      default: false,
    };

    await Database.collection("user-campaigns").insertOne(userCampaign);
    res.json({ campaign: userCampaign });
  },
});
