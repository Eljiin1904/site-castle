import { Validation } from "@core/services/validation";
import { HandledError } from "@server/services/errors";
import { Http } from "#app/services/http";
import { Site } from "#app/services/site";
import { UserCampaigns } from "@core/types/users/UserCampaigns";
import { Database } from "@server/services/database";
import { Ids } from "@server/services/ids";
import { getServerLogger } from "@core/services/logging/utils/serverLogger";
import { LOG_MODULE_CONSTANTS } from "@core/services/logging/constants/LogConstant";
import config from "@core/config";
import { checkProfanityByField } from "#app/services/site/Site";

const logger = getServerLogger({ module: LOG_MODULE_CONSTANTS.LOG_SHARED_BACKEND });
const { env } = config;

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
    if (env === "development") {
      try {
        await checkProfanityByField("campaignName", campaignName);
        await checkProfanityByField("campaignId", campaignId);
      } catch (err: any) {
        logger.error(`Unable to create Campaign due to the following error: ${err}`);
        if (err.toString().includes("Unable to create Campaign due to profanity"))
          throw new HandledError(err);
        throw new HandledError("Unable to create Campaign at this time");
      }
    }

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
