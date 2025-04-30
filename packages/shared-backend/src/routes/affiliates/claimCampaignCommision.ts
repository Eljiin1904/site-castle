import { Intimal } from "@core/services/intimal";
import { Affiliates } from "@server/services/affiliates";
import { HandledError } from "@server/services/errors";
import { Http } from "#app/services/http";
import { Site } from "#app/services/site";
import { Database } from "@server/services/database";
import { Validation } from "@core/services/validation";

export default Http.createApiRoute({
  type: "post",
  path: "/claim-campaigns-commission",
  restricted: true,
  secure: true,
  transaction: true,
  body: Validation.object({
    claim: Validation.array(
      Validation.object({
        campaignId: Validation.string().required("validations:errors.campaign.campaignId"),
        amount: Validation.number().required("validations:errors.campaign.amount"),
      })
    ).required("validations:errors.campaign.required"),
  }),
  callback: async (req, res) => {
    
    const { claim } = req.body;
    const user = req.user;
    
    await Site.validateToggle("affiliatesEnabled");
    const campaigns = await Database.collection("user-campaigns")
    .find({ userId: user._id })
    .toArray();
  
    if (!campaigns.length) {
      throw new HandledError("validations:errors.campaign.notFound");
    }

    const amount = claim.reduce((acc, campaign) => {
      return acc + (campaign.amount || 0);
    }, 0);
    
    if (amount < Intimal.fromDecimal(0.01)) {
      throw new HandledError("validations:errors.campaign.lowBalance");
    }

    const location = await Http.getLocation(req.trueIP);
    await Affiliates.debitCampaignsCommission({ user, claim, location });

    res.json({ amount: amount });
  },
});
