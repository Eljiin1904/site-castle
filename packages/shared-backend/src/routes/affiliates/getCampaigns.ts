import { subDays } from "date-fns";
import { Validation } from "@core/services/validation";
import { HandledError } from "@server/services/errors";

import { Affiliates } from "@server/services/affiliates";
import { Http } from "#app/services/http";
import { Database } from "@server/services/database";

export default Http.createApiRoute({
  type: "post",
  path: "/get-campaigns",
  secure: true,
  body: Validation.object({
    // timeIndex: Validation.index("Time index", 3),
    // sortIndex: Validation.index("Sort index", 4),
    limit: Validation.limit(),
    page: Validation.page(),
  }),
  callback: async (req, res) => {
    const {
      // timeIndex,
      // sortIndex,
      limit,
      page,
    } = req.body;
    const user = req.user;
    if (!user) {
      throw new HandledError("Target user not found.");
    }

    const campaigns = await Database.collection("user-campaigns")
      .find({ userId: user._id })
      .sort({ timestamp: -1 })
      .toArray();
    console.log("Hellooo ");
    res.json({ campaigns: campaigns });
    // return campaigns;

    //  const minDate = [
    //    subDays(Date.now(), 1),
    //    subDays(Date.now(), 7),
    //    subDays(Date.now(), 30),
    //    new Date(0),
    //  ][timeIndex];

    const maxDate = new Date();

    //  const referrals = await Affiliates.aggregateReports({
    //    affiliateId: user._id,
    //    minDate,
    //    maxDate,
    //    sort: {
    //      ...[
    //        { commissionAmount: -1 },
    //        { depositAmount: -1 },
    //        { wagerAmount: -1 },
    //        { lastDepositDate: -1 },
    //        { referDate: -1 },
    //      ][sortIndex],
    //      _id: 1,
    //    },
    //    limit,
    //    page,
    //  });

    //  res.json({ referrals });
  },
});
