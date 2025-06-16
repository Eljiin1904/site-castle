import { Validation } from "@core/services/validation";
import { DiceResult } from "@core/types/dice/DiceResult";
import { Database } from "@server/services/database";
import { Random } from "@server/services/random";
import { Http } from "#app/services/http";

export default Http.createApiRoute({
  type: "post",
  path: "/get-dice-results",
  secure: true,
  body: Validation.object({
    limit: Validation.limit(),
    page: Validation.page(),
  }),
  callback: async (req, res) => {
    const { limit, page } = req.body;
    const user = req.user;

    const seeds = await Random.getUserPair({ userId: user._id });
    const filter = {
      "user.id": user._id,
      processed: true,
    };
    const tickets = await Database.collection("dice-tickets")
      .find(
       filter,
        {
          sort: { timestamp: -1 },
          skip: (page - 1) * limit,
          limit,
        },
      )
      .toArray();

    const results = [];

    for (const ticket of tickets) {
      const result: DiceResult = {
        gameId: ticket._id,
        timestamp: ticket.timestamp,
        betAmount: ticket.betAmount,
        targetValue: ticket.targetValue,
        targetKind: ticket.targetKind,
        multiplier: ticket.multiplier,
        rollValue: ticket.rollValue,
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

    const total = await Database.collection("dice-tickets").countDocuments(filter);
    res.json({ results , total});
  },
});
