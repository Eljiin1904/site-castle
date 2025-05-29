import { Validation } from "@core/services/validation";
import { MinesResult } from "@core/types/mines/MinesResult";
import { Database } from "@server/services/database";
import { Random } from "@server/services/random";
import { Http } from "#app/services/http";

export default Http.createApiRoute({
  type: "post",
  path: "/get-mines-results",
  secure: true,
  body: Validation.object({
    limit: Validation.limit(),
    page: Validation.page(),
  }),
  callback: async (req, res, next) => {
    const { limit, page } = req.body;
    const user = req.user;

    const seeds = await Random.getUserPair({ userId: user._id });

    const games = await Database.collection("mines-games")
      .find(
        {
          "user.id": user._id,
          completed: true,
        },
        {
          sort: { timestamp: -1 },
          skip: (page - 1) * limit,
          limit,
        },
      )
      .toArray();

    const results = [];

    for (const game of games) {
      if (!game.completed) {
        continue;
      }

      const result: MinesResult = {
        gameId: game._id,
        timestamp: game.timestamp,
        betAmount: game.betAmount,
        gridSize: game.gridSize,
        mineCount: game.mineCount,
        revealCount: game.revealCount,
        won: game.won,
        wonAmount: game.wonAmount,
        multiplier: game.multiplier,
        clientSeed: game.clientSeed,
        serverSeedHashed: game.serverSeedHashed,
        nonce: game.nonce,
      };

      if (seeds.serverSeed !== game.serverSeed) {
        result.serverSeed = game.serverSeed;
      }

      results.push(result);
    }

    res.json({ results });
  },
});
