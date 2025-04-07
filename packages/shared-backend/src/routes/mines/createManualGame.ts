import { Validation } from "@core/services/validation";
import { Mines } from "@server/services/mines";
import { Database } from "@server/services/database";
import { HandledError } from "@server/services/errors";
import { Http } from "#app/services/http";
import { Site } from "#app/services/site";

export default Http.createApiRoute({
  type: "post",
  path: "/create-manual-game",
  restricted: true,
  secure: true,
  transaction: true,
  bet: true,
  body: Validation.object({
    betAmount: Validation.number().integer().min(0).required("Bet amount is required."),
    gridSize: Validation.number()
      .integer()
      .oneOf(Mines.gridSizes, "Invalid grid size.")
      .required("Grid size is required."),
    mineCount: Validation.number().integer().min(1).required("Mine count is required."),
  }),
  callback: async (req, res, next) => {
    const { betAmount, gridSize, mineCount } = req.body;
    const user = req.user;

    await Site.validateToggle("minesEnabled");
    await Site.validateSuspension(user);
    await Site.validateKycTier(user, 2);
    await Site.validateTokenBalance(user, betAmount);

    const hasExisting = await Database.exists("mines-games", {
      "user.id": user._id,
      completed: { $exists: false },
    });

    if (hasExisting) {
      throw new HandledError("You already have an existing game.");
    }

    const { max: maxMines } = Mines.getMineMinMax(gridSize);

    if (mineCount > maxMines) {
      throw new HandledError("Exceeds max mines.");
    }

    const location = await Http.getLocation(req.ip);
    const game = await Mines.createGame({
      user,
      location,
      mode: "manual",
      betAmount,
      gridSize,
      mineCount,
    });

    const state = Mines.getGameState(game);

    res.json({ state });
  },
});
