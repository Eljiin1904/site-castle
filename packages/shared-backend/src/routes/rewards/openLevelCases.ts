import { Validation } from "@core/services/validation";
import { Database } from "@server/services/database";
import { HandledError } from "@server/services/errors";
import { Rewards } from "@server/services/rewards";
import { Chests } from "@server/services/chests";
import { Http } from "#app/services/http";
import { Site } from "#app/services/site";

export default Http.createApiRoute({
  type: "post",
  path: "/open-level-cases",
  restricted: true,
  secure: true,
  transaction: true,
  body: Validation.object({
    chestId: Validation.string().required("Chest ID is required"),
    openCount: Validation.integer("Open count").min(1).max(4),
    speed: Validation.string().oneOf(Chests.speeds).required("Speed is required."),
    specialEnabled: Validation.boolean().required("Special is required."),
  }),
  callback: async (req, res) => {
    const { chestId, openCount, speed, specialEnabled } = req.body;
    const user = req.user;
    const keyCount = user.chestKeys[chestId] || 0;

    await Site.validateToggle("rewardsEnabled");
    await Site.validateSuspension(user);

    if (keyCount < openCount) {
      throw new HandledError("You do not have enough keys.");
    }

    const chest = await Database.collection("chests").findOne({
      _id: chestId,
      kind: "level-case",
    });

    if (!chest) {
      throw new HandledError("Invalid case ID.");
    }
    if (chest.disabled) {
      throw new HandledError("Case is disabled.");
    }

    const games = await Rewards.openLevelCases({
      chest,
      openCount,
      user,
      speed,
      specialEnabled,
    });

    const rolls = games.map((x) => x.roll);

    res.json({ rolls });
  },
});
