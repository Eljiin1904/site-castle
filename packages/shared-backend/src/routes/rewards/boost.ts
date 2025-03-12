import { isFuture } from "date-fns";
import { Validation } from "@core/services/validation";
import { Rewards } from "@server/services/rewards";
import { HandledError } from "@server/services/errors";
import { Http } from "#app/services/http";
import { Site } from "#app/services/site";

export default Http.createApiRoute({
  type: "post",
  path: "/boost",
  restricted: true,
  secure: true,
  transaction: true,
  body: Validation.object({
    timeframe: Validation.string()
      .oneOf(Rewards.boostTimeframes)
      .required("Timeframe is required."),
  }),
  callback: async (req, res) => {
    const { timeframe } = req.body;
    const user = req.user;

    await Site.validateToggle("rewardsEnabled");
    await Site.validateSuspension(user);

    const { eventId, startDate } = await Rewards.getBoostEvent({
      user,
      timeframe,
    });

    if (isFuture(startDate)) {
      throw new HandledError("Boost is not available yet.");
    }

    const amount = await Rewards.createBoost({ user, timeframe, eventId });

    res.json({ amount });
  },
});
