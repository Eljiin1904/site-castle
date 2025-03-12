import { Validation } from "@core/services/validation";
import { Rewards } from "@server/services/rewards";
import { HandledError } from "@server/services/errors";
import { Http } from "#app/services/http";
import { Site } from "#app/services/site";

export default Http.createApiRoute({
  type: "post",
  path: "/open-advent",
  restricted: true,
  secure: true,
  transaction: true,
  body: Validation.object({
    day: Validation.integer("Day").min(1).max(31),
  }),
  callback: async (req, res) => {
    const { day } = req.body;
    const user = req.user;

    await Site.validateToggle("rewardsEnabled");
    await Site.validateSuspension(user);

    const { holiday } = await Site.meta.cache();

    if (!holiday) {
      throw new HandledError("No active holiday.");
    }

    const resetDate = holiday.adventResetDate;
    const dayNow = Rewards.getAdventDay({ resetDate });

    if (day !== dayNow) {
      throw new HandledError("Invalid day.");
    }

    const ticket = await Rewards.openAdvent({ user, day });

    res.json({ ticket });
  },
});
