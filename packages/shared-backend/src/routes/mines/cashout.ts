import { Mines } from "@server/services/mines";
import { Database } from "@server/services/database";
import { HandledError } from "@server/services/errors";
import { Http } from "#app/services/http";
import { Site } from "#app/services/site";

export default Http.createApiRoute({
  type: "post",
  path: "/cashout",
  restricted: true,
  secure: true,
  transaction: true,
  callback: async (req, res, next) => {
    const user = req.user;

    await Site.validateToggle("minesEnabled");
    await Site.validateSuspension(user);

    let game = await Database.collection("mines-games").findOne({
      "user.id": user._id,
      completed: { $exists: false },
    });

    if (!game) {
      throw new HandledError("Game lookup failed.");
    }

    if (game.revealCount < 1) {
      throw new HandledError("Game not started.");
    }
    game = await Mines.completeGame({ user, game });

    const state = Mines.getGameState(game);

    res.json({ state });
  },
});
