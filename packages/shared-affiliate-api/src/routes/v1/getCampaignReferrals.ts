import { Validation } from "@core/services/validation";
import { Intimal } from "@core/services/intimal";
import { Affiliates } from "@server/services/affiliates";
import { Users } from "@server/services/users";
import { Http } from "#app/services/http";

type Referral = {
  userId: string;
  displayName: string;
  imageUrl: string;
  xpEarned: number;
  wagerAmount: number;
  depositAmount: number;
  commissionAmount: number;
  acquireTime: number;
};

export default Http.createRoute({
  type: "get",
  path: "/campaign-referrals",
  query: Validation.object({
    campaignId: Validation.string().required().min(5).max(64),
    minTime: Validation.number().integer(),
    maxTime: Validation.number().integer(),
  }),
  callback: async (req, res, next) => {
    const { campaignId, minTime, maxTime } = req.query;
    const userId = req.affiliateId;

    const minDate = new Date(minTime || 0);
    const maxDate = new Date(maxTime || Date.now());

    const reports = await Affiliates.aggregateCampaignReports({
      userId: userId,
      affiliateId: campaignId,
      minDate,
      maxDate,
      sort: { referDate: 1 },
      limit: 1000,
      page: 1,
    });

    const referrals: Referral[] = reports.map((x) => ({
      userId: x.user.id,
      displayName: x.user.name,
      imageUrl: Users.getAvatarUrl(x.user),
      xpEarned: Intimal.toDecimal(x.xp || 0, 0),
      wagerAmount: Intimal.toDecimal(x.wagerAmount || 0, 2),
      depositAmount: Intimal.toDecimal(x.depositAmount || 0, 2),
      commissionAmount: Intimal.toDecimal(x.commissionAmount || 0, 2),
      acquireTime: x.referDate.getTime(),
    }));

    res.json({ referrals });
  },
});
