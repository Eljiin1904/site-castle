import { CaseBattleDocument } from "@core/types/case-battles/CaseBattleDocument";
import { Numbers } from "@core/services/numbers";
import { CaseBattlePlayer } from "@core/types/case-battles/CaseBattlePlayer";
import { Database } from "#server/services/database";
import { HandledError } from "#server/services/errors";
import { Users } from "#server/services/users";

export async function addBot({
  battle,
  seat,
}: {
  battle: CaseBattleDocument;
  seat: number;
}) {
  const available = Users.bots.filter(
    (bot) => !battle.players.some((p) => p?.bot && p.id === bot.id),
  );
  const index = Numbers.randomInt(0, available.length - 1);
  const bot = available[index];

  const player: CaseBattlePlayer = {
    bot: true,
    id: bot.id,
    name: bot.name,
    avatarIndex: bot.avatarIndex,
  };

  const updated = await Database.collection("case-battles").findOneAndUpdate(
    {
      _id: battle._id,
      [`players.${seat}`]: { $type: 10 },
    },
    {
      $set: {
        [`players.${seat}`]: player,
      },
    },
    {
      projection: { players: 1 },
      returnDocument: "after",
    },
  );

  if (!updated) {
    throw new HandledError("Battle seat is already taken.");
  }

  if (updated.players.every((x) => x !== null)) {
    await Database.collection("case-battles").updateOne(
      { _id: battle._id },
      { $set: { ready: true } },
    );
  }
}
