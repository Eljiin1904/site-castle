import { Validation } from "@core/services/validation";
import { Database } from "@server/services/database";
import { HandledError } from "@server/services/errors";
import { Rewards } from "@server/services/rewards";
import { Chests } from "@server/services/chests";
import { Http } from "#app/services/http";
import { Site } from "#app/services/site";

export default Http.createApiRoute({
  type: "post",
  path: "/open-gem-cases",
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

    await Site.validateToggle("rewardsEnabled");
    await Site.validateSuspension(user);

    const chest = await Database.collection("chests").findOne({
      _id: chestId,
      kind: "gem-case",
    });

    if (!chest) {
      throw new HandledError("Invalid case ID.");
    }
    if (chest.disabled) {
      throw new HandledError("Case is disabled.");
    }

    const product = await Database.collection("reward-products").findOne({
      kind: "case",
      "chest.id": chest._id,
    });

    if (!product) {
      throw new HandledError("Product not found.");
    }
    if (product.disabled) {
      throw new HandledError("Case not currently available.");
    }

    const { gemCost } = product;
    const totalCost = Math.round(gemCost * openCount);

    if (totalCost > user.gemBalance) {
      throw new HandledError("You do not have enough gems.");
    }

    const games = await Rewards.openGemCases({
      chest,
      user,
      openCount,
      gemCost,
      speed,
      specialEnabled,
    });

    const rolls = games.map((x) => x.roll);

    res.json({ rolls });
  },
});
