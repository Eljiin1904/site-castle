import { Validation } from "@core/services/validation";
import { ChestGameResult } from "@core/types/chests/ChestGameResult";
import { Database } from "@server/services/database";
import { Random } from "@server/services/random";
import { Chests } from "@server/services/chests";
import { Http } from "#app/services/http";

export default Http.createApiRoute({
  type: "post",
  path: "/get-case-game-results",
  secure: true,
  body: Validation.object({
    kind: Validation.string().oneOf(Chests.kinds).required("Kind is required."),
    limit: Validation.limit(),
    page: Validation.page(),
  }),
  callback: async (req, res) => {
    const { kind, limit, page } = req.body;
    const user = req.user;

    const seeds = await Random.getUserPair({ userId: user._id });

    const games = await Database.collection("chest-games")
      .find(
        {
          "user.id": user._id,
          "chest.kind": kind,
          processed: true,
        },
        {
          sort: { timestamp: -1, _id: 1 },
          skip: (page - 1) * limit,
          limit,
        },
      )
      .toArray();

    const results = [];

    for (const game of games) {
      const result: ChestGameResult = {
        gameId: game._id,
        timestamp: game.timestamp,
        chest: game.chest,
        loot: game.loot,
        roll: game.roll.value,
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
