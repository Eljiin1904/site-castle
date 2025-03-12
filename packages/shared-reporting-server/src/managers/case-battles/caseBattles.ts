import { minutesToMilliseconds, subMinutes } from "date-fns";
import { CaseBattleDocument } from "@core/types/case-battles/CaseBattleDocument";
import { Database } from "@server/services/database";
import { System } from "@server/services/system";
import { CaseBattles } from "@server/services/case-battles";

export default () =>
  setInterval(System.tryCatch(main), minutesToMilliseconds(1));

async function main() {
  const cursor = Database.collection("case-battles").find(
    {
      status: "waiting",
      createDate: { $lt: subMinutes(Date.now(), 30) },
    },
    {
      sort: { createDate: 1 },
    },
  );

  for await (const battle of cursor) {
    await System.tryCatch(fillBattle)(battle);
  }
}

async function fillBattle(battle: CaseBattleDocument) {
  for (let seat = 1; seat < battle.players.length; seat++) {
    if (battle.players[seat] === null) {
      await CaseBattles.addBot({ battle, seat });
    }
  }
}
