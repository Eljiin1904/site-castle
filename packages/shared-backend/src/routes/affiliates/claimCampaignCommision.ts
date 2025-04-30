import { Intimal } from "@core/services/intimal";
import { Affiliates } from "@server/services/affiliates";
import { HandledError } from "@server/services/errors";
import { Http } from "#app/services/http";
import { Site } from "#app/services/site";
import { Database } from "@server/services/database";

export default Http.createApiRoute({
  type: "post",
  path: "/claim-campaigns-commission",
  restricted: true,
  secure: true,
  transaction: true,
  callback: async (req, res) => {
    const user = req.user;
    
    await Site.validateToggle("affiliatesEnabled");
    const campaigns = await Database.collection("user-campaigns")
    .find({ userId: user._id })
    .toArray();
  
    if (!campaigns.length) {
      throw new HandledError("validations:errors.campaign.notFound");
    }

    const amount = campaigns.reduce((acc, campaign) => {
      return acc + (campaign.commissionBalance || 0);
    }, 0);
    
    if (amount < Intimal.fromDecimal(0.01)) {
      throw new HandledError("validations:errors.campaign.lowBalance");
    }

    const location = await Http.getLocation(req.trueIP);

    await Affiliates.debitCampaignsCommission({ user, amount, location });

    res.json({ amount: amount });
  },
});
