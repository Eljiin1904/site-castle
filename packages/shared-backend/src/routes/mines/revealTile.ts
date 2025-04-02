import { Validation } from "@core/services/validation";
import { Mines } from "@server/services/mines";
import { Database } from "@server/services/database";
import { HandledError } from "@server/services/errors";
import { Http } from "#app/services/http";
import { Site } from "#app/services/site";

export default Http.createApiRoute({
  type: "post",
  path: "/reveal-tile",
  restricted: true,
  secure: true,
  transaction: true,
  body: Validation.object({
    revealIndex: Validation.number().integer().min(0).required("Reveal index is required."),
  }),
  callback: async (req, res, next) => {
    const { revealIndex } = req.body;
    const user = req.user;

    await Site.validateToggle("minesEnabled");
    await Site.validateSuspension(user);

    let game = await Database.collection("mines-games").findOne({
      "user.id": user._id,
      completed: { $exists: false },
    });

    if (!game) {
      throw new HandledError("Mine game lookup failed.");
    }

    if (revealIndex >= Mines.getTileCount(game.gridSize)) {
      throw new HandledError("Invalid reveal index.");
    }
    if (game.reveals.includes(revealIndex)) {
      throw new HandledError("Tile already revealed.");
    }

    game = await Mines.revealTile({ user, game, revealIndex });

    const state = Mines.getGameState(game);

    res.json({ state });
  },
});
