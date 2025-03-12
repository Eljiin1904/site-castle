import { Rewards } from "@server/services/rewards";
import { Http } from "#app/services/http";

export default Http.createApiRoute({
  type: "post",
  path: "/get-boost-dates",
  secure: false,
  callback: async (req, res) => {
    const user = req.user;

    const daily = await Rewards.getBoostEvent({ user, timeframe: "daily" });
    const weekly = await Rewards.getBoostEvent({ user, timeframe: "weekly" });
    const monthly = await Rewards.getBoostEvent({ user, timeframe: "monthly" });

    res.json({ daily, weekly, monthly });
  },
});
