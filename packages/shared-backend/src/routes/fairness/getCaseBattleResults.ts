import { Validation } from "@core/services/validation";
import { CaseBattleResult } from "@core/types/case-battles/CaseBattleResult";
import { Database } from "@server/services/database";
import { Http } from "#app/services/http";

export default Http.createApiRoute({
  type: "post",
  path: "/get-case-battle-results",
  secure: true,
  body: Validation.object({
    limit: Validation.limit(),
    page: Validation.page(),
  }),
  callback: async (req, res) => {
    const { limit, page } = req.body;
    const user = req.user;

    const battles = await Database.collection("case-battles")
      .find(
        {
          players: {
            $elemMatch: {
              id: user._id,
              bot: { $exists: false },
            },
          },
          status: "completed",
        },
        {
          sort: { createDate: -1, _id: 1 },
          skip: (page - 1) * limit,
          limit,
          projection: {
            chests: 0,
            serverSeedHash: 0,
          },
        },
      )
      .toArray();

    const results = [];

    for (const battle of battles) {
      if (battle.status !== "completed") {
        continue;
      }

      const result: CaseBattleResult = {
        gameId: battle._id,
        timestamp: battle.createDate,
        mode: battle.mode,
        modifiers: battle.modifiers,
        entryCost: battle.entryCost,
        serverSeed: battle.serverSeed,
        eosBlockId: battle.eosBlockId,
        eosBlockNum: battle.eosBlockNum,
        playerCount: battle.players.length,
        rounds: battle.rounds.map((x) => ({
          rolls: x.rolls.map((n) => n.value),
        })),
        winners: battle.players.filter((x) => x.won).map((x, i) => battle.players.indexOf(x)),
        totalWon: battle.totalWon,
      };

      results.push(result);
    }

    res.json({ results });
  },
});
