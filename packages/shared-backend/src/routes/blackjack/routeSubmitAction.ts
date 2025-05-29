import { Validation } from "@core/services/validation";
import { Http } from "#app/services/http";
import { Transactions } from "@server/services/transactions";
import { BlackjackAction } from "@core/types/blackjack/BlackjackAction";
import { findGameById } from "@server/services/blackjack/utils/findGameById";
import {
  checkPayout,
  CustomError,
  Game,
  getInsuranceBetAmount,
  saveGame,
  validateActionParams,
} from "@server/services/blackjack/Blackjack";
import { getRandomCardIndex } from "@server/services/blackjack/utils/getRandomCardIndex";
import { Site } from "#app/services/site";
import { Blackjack } from "@server/services/blackjack";
import { validateEnoughTokens } from "./validate/validateEnoughTokens";

// attempted to add sidebet validation into yup, couldn't figure it out, haven't given up
// function createValidationObj() {
//   const obj = keys(initBetAmounts).reduce((acc, key) => {
//     acc[key] = Validation.number()
//       .integer()
//       .min(0)
//       .required(`betAmounts[${key}] is required.`);
//   }, {} as any);
//   return Validation.object(obj);
// }

// buyInsurance integrate co-dependency yup

export default Http.createApiRoute({
  type: "post",
  path: "/submit-action",
  restricted: true,
  secure: true,
  transaction: true,
  bet: true,
  body: Validation.object({
    gameId: Validation.string().required(),
    action: Validation.string().required(),
    buyInsurance: Validation.boolean(),
    syncIndex: Validation.number(),
  }),
  callback: async (req, res, next) => {
    const { gameId, buyInsurance, syncIndex } = req.body;
    const action = req.body.action as BlackjackAction;
    const user = req.user;
    const userId = user._id;

    validateActionParams({ gameId, action, buyInsurance });

    await Site.validateToggle("blackjackEnabled");
    await Site.validateSuspension(user);
    await Site.validateKycTier(user, Validation.kycTiers.email);

    const location = await Http.getLocation(req.ip);

    try {
      if (syncIndex === undefined) throw new Error("syncIndex is required to perform action");

      const gameData = await findGameById({ gameId });
      if (!gameData) throw new Error("Game not found by id " + gameId);

      if (gameData.completed) {
        throw new CustomError("Blackjack submit action: game already completed", {
          data: { gameId, userId: user._id },
        });
      }

      // 2x validate user owns game, just in case
      const gameUser = gameData.players.find((p) => p.userId === userId);
      if (!gameUser)
        throw new CustomError("Game not found for user", {
          data: { gameId, userId },
        });

      const sharedTransaction = {
        user,
        // TODO does this change for split,double,insurance?
        location,
        gameId: gameData._id,
      };

      const game = new Game(gameData, {
        getRandomCardIndex,
        // moving onto callbacks because transactions aren't avail
        onDouble: async () => {
          if (!betAmount) return;
          await Transactions.createBet({
            kind: `blackjack-${action as "split" | "double"}`,
            betAmount: betAmount,
            edgeRate: Blackjack.edgeRate,
            ...sharedTransaction,
          });
        },
        onSplit: async () => {
          if (!betAmount) return;
          Transactions.createBet({
            kind: `blackjack-${action as "split" | "double"}`,
            betAmount: betAmount,
            edgeRate: Blackjack.edgeRate,
            ...sharedTransaction,
          });
        },
        onInsurance: async () => {
          if (!betAmount) return;
          await Transactions.createBet({
            kind: `blackjack-sidebet-bet`,
            subKind: "insurance",
            betAmount: getInsuranceBetAmount(betAmount),
            edgeRate: Blackjack.sidebetEdgeRates["insurance"],
            ...sharedTransaction,
          });
        },
      });

      const betAmount = game.getCurPlayerMainBet({ userId });

      validateEnoughTokens({ betAmount, user, action, buyInsurance });

      await game.action(action, syncIndex, { userId, buyInsurance });

      await saveGame({ game: game.getDbObj() });

      await checkPayout(game, { user });

      return void res.json(game.getApiResponse());
    } catch (e) {
      throw new CustomError("Blackjack action", {
        data: { userId, gameId },
        error: e,
      });
    }
  },
});
