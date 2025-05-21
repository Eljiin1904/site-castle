import { Validation } from "@core/services/validation";
import { Http } from "#app/services/http";
import { CustomError, findPendingGame, Game } from "@server/services/blackjack/Blackjack";
import { Site } from "#app/services/site";

export default Http.createApiRoute({
  type: "get",
  path: "/get-existing-game",
  restricted: true,
  secure: true,
  transaction: false,
  // bet: true,
  body: Validation.object({}),
  callback: async (req, res, next) => {
    const user = req.user;
    const userId = user._id;

    if (!userId) {
      throw new Error("User ID is not defined");
    }

    await Site.validateToggle("blackjackEnabled");

    try {
      const gameData = await findPendingGame({ userId });

      if (!gameData) {
        return void res.json({});
      } else {
        const game = new Game(gameData, {
          getRandomCardIndex: () => {
            throw new Error("getRandomCardIndex should not be called here");
          },
        });
        return void res.json(game.getApiResponse());
      }
    } catch (e) {
      throw new CustomError("Blackjack get existing game error", {
        data: { userId },
        error: e,
      });
    }
  },
});
