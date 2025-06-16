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
    const filter = {
      "players.userId": user._id,
      completed: true
    };

    const games = await Database.collection("blackjack-games")
      .find(
        filter,
        {
          sort: { timestamp: -1 },
          skip: (page - 1) * limit,
          limit,
        },
      )
      .toArray();

    const results = games.map((game) => getFairnessResult(game, serverSeed));
    const total = await Database.collection("blackjack-games").countDocuments(filter);
    res.json({ results , total});
  },
});
