import { Validation } from "@core/services/validation";
import { Http } from "#app/services/http";
import { Ids } from "@server/services/ids";
import { Transactions } from "@server/services/transactions";
import { BlackjackBetAmounts } from "@core/types/blackjack/BlackjackBetAmounts";
import {
  checkPayout,
  CustomError,
  findPendingGame,
  Game,
  insertGame,
  validateBetAmounts,
} from "@server/services/blackjack/Blackjack";
import { getRandomCardIndex } from "@server/services/blackjack/utils/getRandomCardIndex";
import { Site } from "#app/services/site";
import { Blackjack } from "@server/services/blackjack";
import { entries } from "@core/services/utility/Utility";
import { Random } from "@server/services/random";

export default Http.createApiRoute({
  type: "post",
  path: "/create-game",
  restricted: true,
  secure: true,
  transaction: true,
  bet: true,
  body: Validation.object({
    betAmounts: Validation.object({}), //, createValidationObj(),
  }),
  callback: async (req, res, next) => {
    const betAmounts = req.body.betAmounts as BlackjackBetAmounts;
    const user = req.user;
    const userId = user._id;

    const { sum: totalBetAmount } = validateBetAmounts(betAmounts);

    await Site.validateToggle("blackjackEnabled");
    await Site.validateSuspension(user);
    await Site.validateKycTier(user, Validation.kycTiers.personalInfo);
    await Site.validateTokenBalance(user, totalBetAmount);

    if (betAmounts["21+3"] > 0) {
      await Site.validateToggle("blackjack213Enabled");
    }
    if (betAmounts["lucky-ladies"] > 0) {
      await Site.validateToggle("blackjackLuckyLadiesEnabled");
    }
    if (betAmounts["perfect-pairs"] > 0) {
      await Site.validateToggle("blackjackPerfectPairsEnabled");
    }
    if (betAmounts["blackjack-15x"] > 0) {
      await Site.validateToggle("blackjackBlackjack15xEnabled");
    }

    const location = await Http.getLocation(req.ip);

    try {
      const gameData = await findPendingGame({ userId });
      if (gameData) throw new Error("User has a pending game");

      const _id = await Ids.incremental({
        key: "blackjackGameId",
        baseValue: 1000000,
        batchSize: 100,
      });

      if (totalBetAmount > 0) {
        if (totalBetAmount > user.tokenBalance)
          throw new Error("You don't have enough tokens to perform this action");

        const mainBet = betAmounts["main-bet"];

        const sharedTransaction = {
          user,
          location,
          gameId: _id,
        };

        if (mainBet)
          await Transactions.createBet({
            kind: "blackjack-bet",
            edgeRate: Blackjack.edgeRate,
            betAmount: mainBet,
            ...sharedTransaction,
          });

        for (const [type, amount] of entries(betAmounts)) {
          if (type == "main-bet") continue;
          if (amount === 0) continue;

          await Transactions.createBet({
            kind: "blackjack-sidebet-bet",
            edgeRate: Blackjack.sidebetEdgeRates[type],
            betAmount: amount,
            subKind: type,
            ...sharedTransaction,
          });
        }
      }

      const { serverSeed, clientSeed, nonce } = await Random.nextUserNonce(userId);

      const game = new Game(
        {
          _id,
          players: [{ userId, betAmounts }],
          seeds: {
            serverSeed,
            serverSeedHashed: Random.hashServerSeed(serverSeed),
            clientSeed,
            nonce,
          },
        },
        {
          getRandomCardIndex,
        },
      );
      await game.dealFirstCards();

      await insertGame({ game: game.getDbObj() });

      const resp = game.getApiResponse();

      await checkPayout(game, { user });

      return void res.json(resp);
    } catch (e) {
      throw new CustomError("Blackjack get existing game error", {
        data: { userId },
        error: e,
      });
    }
  },
});
