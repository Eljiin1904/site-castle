import { subDays } from "date-fns";
import { Validation } from "@core/services/validation";
import { Affiliates } from "@server/services/affiliates";
import { Http } from "#app/services/http";
import { Database } from "@server/services/database";
import { HandledError } from "@server/services/errors";

export default Http.createApiRoute({
  type: "post",
  path: "/get-campaign-referrals",
  secure: true,
  body: Validation.object({
    campaignId: Validation.string().required().min(5).max(25),
    timeIndex: Validation.index("Time index", 3),
    sortIndex: Validation.index("Sort index", 4),
    limit: Validation.limit(),
    page: Validation.page(),
  }),
  callback: async (req, res) => {
    const { campaignId, timeIndex, sortIndex, limit, page } = req.body;
    const user = req.user;

    const campaign = await Database.collection("user-campaigns").findOne({
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

    const referrals = await Affiliates.aggregateCampaignReports({
      userId: user._id,
      affiliateId: campaign._id,
      minDate,
      maxDate,
      sort: {
        ...[
          { commissionAmount: -1 },
          { depositAmount: -1 },
          { wagerAmount: -1 },
          { lastDepositDate: -1 },
          { referDate: -1 },
        ][sortIndex],
        _id: 1,
      },
      limit,
      page,
    });
    
    res.json({ referrals });
  },
});
