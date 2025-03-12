import { Validation } from "@core/services/validation";
import { Rewards } from "@server/services/rewards";
import { Database } from "@server/services/database";
import { Http } from "#app/services/http";

export default Http.createApiRoute({
  type: "post",
  path: "/get-boost-events",
  body: Validation.object({
    timeframe: Validation.string().oneOf(Rewards.boostTimeframes, "Invalid timeframe."),
    limit: Validation.limit(),
    page: Validation.page(),
  }),
  callback: async (req, res) => {
    const { timeframe, limit, page } = req.body;

    const events = await Database.collection("reward-boost-events")
      .find(timeframe ? { timeframe } : {}, {
        sort: { startDate: -1, _id: 1 },
        skip: (page - 1) * limit,
        limit,
      })
      .toArray();

    res.json({ events });
  },
});
