import { Validation } from "@core/services/validation";
import { Database } from "@server/services/database";
import { HandledError } from "@server/services/errors";
import { Cases } from "@server/services/cases";
import { Http } from "#app/services/http";
import { Site } from "#app/services/site";
import { Chests } from "@server/services/chests";

export default Http.createApiRoute({
  type: "post",
  path: "/open-cases",
  restricted: true,
  secure: true,
  transaction: true,
  bet: true,
  body: Validation.object({
    chestId: Validation.string().required("Chest ID is required"),
    openCount: Validation.integer("Open count").min(1).max(4),
    speed: Validation.string().oneOf(Chests.speeds).required("Speed is required."),
    specialEnabled: Validation.boolean().required("Special is required."),
  }),
  callback: async (req, res) => {
    const { chestId, openCount, speed, specialEnabled } = req.body;
    const user = req.user;

    await Site.validateToggle("casesEnabled");
    await Site.validateConfirmed(user);
    await Site.validateSuspension(user);

    const chest = await Database.collection("chests").findOne({
      _id: chestId,
      kind: "case",
    });

    if (!chest) {
      throw new HandledError("Invalid case ID.");
    }
    if (chest.disabled) {
      throw new HandledError("Case is disabled.");
    }

    const totalCost = Math.round(chest.openCost * openCount);

    await Site.validateTokenBalance(user, totalCost);

    const location = await Http.getLocation(req.trueIP);

    const games = await Cases.createBets({
      chest,
      user,
      openCount,
      speed,
      specialEnabled,
      location,
    });

    const rolls = games.map((x) => x.roll);

    res.json({ rolls });
  },
});
