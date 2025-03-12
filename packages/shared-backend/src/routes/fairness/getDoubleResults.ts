import { Validation } from "@core/services/validation";
import { DoubleResult } from "@core/types/double/DoubleResults";
import { Database } from "@server/services/database";
import { Http } from "#app/services/http";

export default Http.createApiRoute({
  type: "post",
  path: "/get-double-results",
  secure: true,
  body: Validation.object({
    limit: Validation.limit(),
    page: Validation.page(),
  }),
  callback: async (req, res) => {
    const { limit, page } = req.body;
    const user = req.user;

    const tickets = await Database.collection("double-tickets")
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

    const set = new Set<string>();

    tickets.forEach((x) => set.add(x.roundId));

    const rounds = await Database.collection("double-rounds")
      .find({
        _id: { $in: [...set.keys()] },
      })
      .toArray();

    const results = [];

    for (const ticket of tickets) {
      const round = rounds.find((x) => x._id === ticket.roundId);

      if (!round || round.status !== "completed") {
        continue;
      }

      const result: DoubleResult = {
        gameId: ticket._id,
        timestamp: ticket.timestamp,
        roundId: round._id,
        betKind: ticket.betKind,
        betAmount: ticket.betAmount,
        roll: round.roll,
        eosBlockId: round.eosBlockId,
        serverSeed: round.serverSeed,
      };

      results.push(result);
    }

    res.json({ results });
  },
});
