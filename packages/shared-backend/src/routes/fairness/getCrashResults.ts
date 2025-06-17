import { Validation } from "@core/services/validation";
import { Database } from "@server/services/database";
import { Random } from "@server/services/random";
import { Http } from "#app/services/http";
import { CrashResult } from "@core/types/crash/CrashResult";

export default Http.createApiRoute({
  type: "post",
  path: "/get-crash-results",
  secure: true,
  body: Validation.object({
    limit: Validation.limit(),
    page: Validation.page(),
  }),
  callback: async (req, res, next) => {
    const { limit, page } = req.body;
    const user = req.user;

    const seeds = await Random.getUserPair({ userId: user._id });
    const filter = {
      "user.id": user._id,
      processed: true,
    };
    const tickets = await Database.collection("crash-tickets")
      .find(
        filter,
        {
          sort: { timestamp: -1 },
          skip: (page - 1) * limit,
          limit,
        },
      )
      .toArray();

    const set = new Set<string>();

    tickets.forEach((x) => set.add(x.roundId));

    const multipliers = await Database.collection("crash-multipliers")
      .find({
        roundId: { $in: [...set.keys()] },
      })
      .toArray();

    const results = [];

    for (const ticket of tickets) {
      if (!ticket.processed) {
        console.warn("Ticket without multiplierCrashed", ticket);
        continue;
      }
      const multiplier = multipliers.find((x) => x.roundId === ticket.roundId);

      if (!multiplier) {
        continue;
      }

      const result: CrashResult = {
        gameId: ticket._id,
        roundId: ticket.roundId,
        timestamp: ticket.timestamp,
        betAmount: ticket.betAmount,
        won: ticket.won ?? false,
        wonAmount: ticket.wonAmount ?? 0,
        multiplier: multiplier.multiplier,
        cashoutMultiplier: ticket.multiplierCrashed,
        serverHash: multiplier.serverHash,
        clientHash: multiplier.serverHash,
      };
      results.push(result);
    }
    const total = await Database.collection("crash-tickets").countDocuments(filter);
    res.json({ results , total});
  },
});
