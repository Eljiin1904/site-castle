import { subDays } from "date-fns";
import { Validation } from "@core/services/validation";
import { Affiliates } from "@server/services/affiliates";
import { Http } from "#app/services/http";
import { Database } from "@server/services/database";
import { HandledError } from "@server/services/errors";

export default Http.createApiRoute({
  type: "post",
  path: "/get-campaign-stats",
  secure: true,
  body: Validation.object({
    campaignId: Validation.string().required().min(5).max(64),
    timeIndex: Validation.index("Time index", 3),
  }),
  callback: async (req, res) => {
    const { campaignId, timeIndex } = req.body;
    const user = req.user;

    const campaign = Database.collection("user-campaigns").findOne({
      userId: user._id,
      campaignId: campaignId,
    });

    if (!campaign) {
      throw new HandledError("Campaign does not exists");
    }

    const minDate = [
      subDays(Date.now(), 1),
      subDays(Date.now(), 7),
      subDays(Date.now(), 30),
      new Date(0),
    ][timeIndex];

    const maxDate = new Date();

    const stats = await Affiliates.aggregateCampaignStats({
      affiliateId: campaignId,
      minDate,
      maxDate,
    });

    res.json({ stats });
  },
});
