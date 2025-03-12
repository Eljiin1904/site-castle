import { Validation } from "@core/services/validation";
import { LimboResult } from "@core/types/limbo/LimboResult";
import { Database } from "@server/services/database";
import { Random } from "@server/services/random";
import { Http } from "#app/services/http";

export default Http.createApiRoute({
  type: "post",
  path: "/get-limbo-results",
  secure: true,
  body: Validation.object({
    limit: Validation.limit(),
    page: Validation.page(),
  }),
  callback: async (req, res) => {
    const { limit, page } = req.body;
    const user = req.user;

    const seeds = await Random.getUserPair({ userId: user._id });

    const tickets = await Database.collection("limbo-tickets")
      .find(
        {
          "user.id": user._id,
          processed: true,
        },
        {
          sort: { timestamp: -1 },
          skip: (page - 1) * limit,
          limit,
        },
      )
      .toArray();

    const results = [];

    for (const ticket of tickets) {
      const result: LimboResult = {
        gameId: ticket._id,
        timestamp: ticket.timestamp,
        betAmount: ticket.betAmount,
        targetValue: ticket.targetValue,
        multiplier: ticket.multiplier,
        rollValue: ticket.rollValue,
        rollMultiplier: ticket.rollMultiplier,
        won: ticket.won,
        wonAmount: ticket.wonAmount,
        clientSeed: ticket.clientSeed,
        serverSeedHashed: ticket.serverSeedHashed,
        nonce: ticket.nonce,
      };

      if (seeds.serverSeed !== ticket.serverSeed) {
        result.serverSeed = ticket.serverSeed;
      }

      results.push(result);
    }

    res.json({ results });
  },
});
