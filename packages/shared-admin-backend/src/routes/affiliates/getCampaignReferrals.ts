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
    affiliateId: Validation.string().required(),
    timeIndex: Validation.index("Time index", 3),
    sortIndex: Validation.index("Sort index", 4),
    limit: Validation.limit(),
    page: Validation.page(),
  }),
  callback: async (req, res) => {
    const { affiliateId, timeIndex, sortIndex, limit, page } = req.body;

    const campaign = await Database.collection("user-campaigns").findOne({
      campaignId: affiliateId,
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
      userId: campaign.userId,
      affiliateId,
      minDate,
      maxDate,
      sort: {
        ...[
          { depositAmount: -1 },
          { wagerAmount: -1 },
          { commissionAmount: -1 },
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
