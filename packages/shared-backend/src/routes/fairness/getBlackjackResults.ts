import { Validation } from "@core/services/validation";
import { Database } from "@server/services/database";
import { Random } from "@server/services/random";
import { Http } from "#app/services/http";
import { getFairnessResult } from "@server/services/blackjack/Blackjack";

export default Http.createApiRoute({
  type: "post",
  path: "/get-blackjack-results",
  secure: true,
  body: Validation.object({
    limit: Validation.limit(),
    page: Validation.page(),
  }),
  callback: async (req, res, next) => {
    const { limit, page } = req.body;
    const user = req.user;

    const { serverSeed } = await Random.getUserPair({ userId: user._id });

    const games = await Database.collection("blackjack-games")
      .find(
        {
          completed: true,
          "players.userId": user._id,
          // TODO deleting this, I think I put it for backward compat
          // seeds: { $exists: true },
        },
        {
          sort: { timestamp: -1 },
          skip: (page - 1) * limit,
          limit,
        },
      )
      .toArray();

    const results = games.map((game) => getFairnessResult(game, serverSeed));

    res.json({ results });
  },
});
