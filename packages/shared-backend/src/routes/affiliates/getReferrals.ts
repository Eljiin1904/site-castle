import { subDays } from "date-fns";
import { Validation } from "@core/services/validation";
import { Affiliates } from "@server/services/affiliates";
import { Http } from "#app/services/http";

export default Http.createApiRoute({
  type: "post",
  path: "/get-referrals",
  secure: true,
  body: Validation.object({
    timeIndex: Validation.index("Time index", 3),
    sortIndex: Validation.index("Sort index", 4),
    limit: Validation.limit(),
    page: Validation.page(),
  }),
  callback: async (req, res) => {
    const { timeIndex, sortIndex, limit, page } = req.body;
    const user = req.user;

    const minDate = [
      subDays(Date.now(), 1),
      subDays(Date.now(), 7),
      subDays(Date.now(), 30),
      new Date(0),
    ][timeIndex];

    const maxDate = new Date();

    const referrals = await Affiliates.aggregateReports({
      affiliateId: user._id,
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
