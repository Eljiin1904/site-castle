import { Intimal } from "@core/services/intimal";
import { Affiliates } from "@server/services/affiliates";
import { HandledError } from "@server/services/errors";
import { Http } from "#app/services/http";
import { Site } from "#app/services/site";
import { Validation } from "@core/services/validation";
import { Database } from "@server/services/database";

export default Http.createApiRoute({
  type: "post",
  path: "/claim-campaign-commission",
  restricted: true,
  secure: true,
  body: Validation.object({
    campaignId: Validation.string().required("Campaign ID is required").min(5).max(25),
  }),
  transaction: true,
  callback: async (req, res) => {
    const user = req.user;
    const { campaignId } = req.body;

    await Site.validateToggle("affiliatesEnabled");

    const campaign = await Database.collection("user-campaigns").findOne({
      userId: user._id,
      campaignId: campaignId,
    });

    if (!campaign) {
      throw new HandledError("Campaign not found.");
    }

    const amount: number = campaign.commissionBalance || 0;

    if (amount < Intimal.fromDecimal(0.01)) {
      throw new HandledError("Your balance is too low.");
    }

    const location = await Http.getLocation(req.trueIP);

    await Affiliates.debitCampaignCommission({ user, campaignId, amount, location });

    res.json({ amount: campaign.commissionBalance });
  },
});
