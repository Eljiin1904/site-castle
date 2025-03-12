import { CaseBattles } from "@core/services/case-battles";
import { CaseBattleDocument } from "@core/types/case-battles/CaseBattleDocument";
import {
  CaseBattlePlayer,
  CaseBattlePlayerWithResult,
} from "@core/types/case-battles/CaseBattlePlayer";
import { CaseBattleRound } from "@core/types/case-battles/CaseBattleRound";
import { Utility } from "@core/services/utility";
import { Site } from "@server/services/site";
import { Chests } from "@server/services/chests";
import { Database } from "@server/services/database";
import { System } from "@server/services/system";
import { Transactions } from "@server/services/transactions";
import { Chat } from "@server/services/chat";
import { Random } from "@server/services/random";

export default () => System.tryCatch(main)();

async function main() {
  const cursor = Database.collection("case-battles").find(
    {
      status: { $ne: "completed" },
      ready: true,
    },
    {
      sort: { timestamp: 1 },
    },
  );

  for await (const battle of cursor) {
    if (battle.status === "waiting") {
      System.tryCatch(setupBattle)(battle);
    } else if (battle.status === "pending") {
      System.tryCatch(startBattle)(battle);
    } else if (battle.status === "simulating") {
      System.tryCatch(simulateBattle)(battle);
    }
  }

  watch();
}

function watch() {
  const changeStream = Database.collection("case-battles").watch(
    [
      {
        $match: {
          operationType: "update",
          "updateDescription.updatedFields.ready": true,
        },
      },
    ],
    { fullDocument: "updateLookup" },
  );

  changeStream.on("change", (e) => {
    if (e.operationType === "update" && e.fullDocument) {
      System.tryCatch(setupBattle)(e.fullDocument);
    }
  });

  changeStream.on("error", (err) => {
    console.error(err.message);
    changeStream.removeAllListeners();
    watch();
  });
}

async function setupBattle(battle: CaseBattleDocument) {
  if (battle.status !== "waiting") {
    return;
  }

  const blockNow = await Random.getEosBlockNow();
  const eosBlockNum = blockNow.eosBlockNum + 4;

  await Database.collection("case-battles").updateOne(
    {
      _id: battle._id,
    },
    {
      $set: {
        status: "pending",
        statusDate: new Date(),
        eosBlockNum,
        eosCommitDate: new Date(),
      },
    },
  );

  await Utility.wait(3000);

  await startBattle({
    ...battle,
    players: battle.players as CaseBattlePlayer[],
    status: "pending",
    statusDate: new Date(),
    eosBlockNum,
    eosCommitDate: new Date(),
  });
}

async function startBattle(battle: CaseBattleDocument) {
  if (battle.status !== "pending") {
    return;
  }

  const { id: eosBlockId } = await Random.getEosBlock(battle.eosBlockNum);

  await Database.collection("case-battles").updateOne(
    { _id: battle._id },
    {
      $set: {
        status: "simulating",
        statusDate: new Date(),
        eosBlockId,
      },
    },
  );

  await simulateBattle({
    ...battle,
    status: "simulating",
    eosBlockId,
  });
}

async function simulateBattle(battle: CaseBattleDocument) {
  if (battle.status !== "simulating") {
    return;
  }

  for (let roundIndex = 0; roundIndex < battle.rounds.length; roundIndex++) {
    const round = battle.rounds[roundIndex];

    if (round.rolls.length > 0) {
      continue;
    }

    await processRound(battle, round, roundIndex);
  }

  await completeBattle(battle);
}

async function processRound(
  battle: CaseBattleDocument,
  round: CaseBattleRound,
  roundIndex: number,
) {
  if (battle.status !== "simulating") {
    return;
  }

  const chest = CaseBattles.getRoundChest(battle, roundIndex);
  let special = false;

  for (let seat = 0; seat < battle.players.length; seat++) {
    const serverSeed = battle.serverSeed;
    const clientSeed = battle.eosBlockId;
    const nonce = `${roundIndex}-${seat}`;
    const rollValue = Random.getRoll({
      serverSeed,
      clientSeed,
      nonce,
      maxValue: 1000000,
    });
    const roll = Chests.createRoll({
      chest,
      specialEnabled: true,
      value: rollValue,
    });

    special = special || roll.specialSpin;

    round.rolls.push(roll);
  }

  await Database.collection("case-battles").updateOne(
    { _id: battle._id },
    {
      $set: {
        roundIndex,
        [`rounds.${roundIndex}.rolls`]: round.rolls,
      },
    },
  );

  await Utility.wait(CaseBattles.getSpinDuration());
  await Utility.wait(Chests.alignTime);

  if (special) {
    await Utility.wait(Chests.resultTime);
    await Utility.wait(CaseBattles.getSpinDuration());
    await Utility.wait(Chests.alignTime);
  }

  await Utility.wait(Chests.resultTime);

  for (let seat = 0; seat < battle.players.length; seat++) {
    const player = battle.players[seat];
    const roll = round.rolls[seat];
    const loot = chest.items[roll.lootIndex];

    await Chests.createDrop({
      source: "battle",
      user: player,
      chest: Chests.getBasicChest(chest),
      loot,
    });

    await Site.trackActivity({
      kind: "case-battle-drop",
      user: player,
      amount: loot.lootValue,
      battleId: battle._id,
      chest: Chests.getBasicChest(chest),
      loot,
    });

    if (loot.announce) {
      await Chat.createMessage({
        agent: "system",
        channel: null,
        kind: "case-battle-win",
        user: player,
        battle: CaseBattles.getBasicBattle(battle),
        chest: Chests.getBasicChest(chest),
        item: loot,
      });
    }
  }
}

async function completeBattle(battle: CaseBattleDocument) {
  if (battle.status !== "simulating") {
    return;
  }

  const { _id: battleId, mode, modifiers, rounds } = battle;

  const category = CaseBattles.getModeCategory(mode);
  const isCrazy = modifiers.includes("crazy");
  const players = battle.players as CaseBattlePlayerWithResult[];

  const wonTotals = players.map(() => 0);
  const firstTotals = players.map(() => 0);
  const lastTotals = players.map(() => 0);

  for (let roundIndex = 0; roundIndex < rounds.length; roundIndex++) {
    const round = rounds[roundIndex];
    const chest = CaseBattles.getRoundChest(battle, roundIndex);

    for (let seat = 0; seat < round.rolls.length; seat++) {
      const lootIndex = round.rolls[seat].lootIndex;
      const loot = chest.items[lootIndex];

      wonTotals[seat] += loot.lootValue;

      if (roundIndex === 0) {
        firstTotals[seat] += loot.lootValue;
      }

      if (roundIndex === rounds.length - 1) {
        lastTotals[seat] += loot.lootValue;
      }
    }
  }

  let gameTotals;

  if (modifiers.includes("first-draw")) {
    gameTotals = firstTotals;
  } else if (modifiers.includes("final-draw")) {
    gameTotals = lastTotals;
  } else {
    gameTotals = wonTotals;
  }

  const bestTotal = isCrazy ? Math.min(...gameTotals) : Math.max(...gameTotals);
  const bestSeats: number[] = [];

  if (category === "FFA Battle") {
    for (let seat = 0; seat < players.length; seat++) {
      if (gameTotals[seat] === bestTotal) {
        bestSeats.push(seat);
      }
    }
  } else if (category === "Team Battle") {
    const t1 = gameTotals[0] + gameTotals[1];
    const t2 = gameTotals[2] + gameTotals[3];

    if (t1 === t2) {
      bestSeats.push(...players.map((x, i) => i));
    } else if ((t1 > t2 && !isCrazy) || (t1 < t2 && isCrazy)) {
      bestSeats.push(0, 1);
    } else {
      bestSeats.push(2, 3);
    }
  } else if (category === "Group Unbox") {
    bestSeats.push(...players.map((x, i) => i));
  }

  const totalWon = wonTotals.reduce((acc, x) => acc + x, 0);
  const split = Math.round(totalWon / bestSeats.length);

  for (let seat = 0; seat < players.length; seat++) {
    const player = players[seat];

    player.totalAmount = wonTotals[seat];
    player.won = bestSeats.includes(seat);

    if (player.won) {
      player.wonAmount = split;
    }
  }

  await Database.collection("case-battles").updateOne(
    { _id: battleId },
    {
      $set: {
        totalWon,
        players,
        status: "completed",
        statusDate: new Date(),
      },
    },
  );

  await Utility.wait(4000);

  for (const player of players) {
    await System.tryCatch(finalizePlayer)({ battle, player });
  }
}

async function finalizePlayer({
  battle,
  player,
}: {
  battle: CaseBattleDocument;
  player: CaseBattlePlayerWithResult;
}) {
  if (player.bot) {
    return;
  }

  await Site.trackBet({
    game: "case-battles",
    user: player,
    betAmount: battle.entryCost,
    won: player.won,
    wonAmount: player.won ? player.wonAmount : 0,
  });

  if (player.won) {
    const user = await Database.collection("users").findOne({
      _id: player.id,
    });

    if (!user) {
      throw new Error(`User lookup failed, ${player.id}`);
    }

    await Transactions.createTransaction({
      user,
      autoComplete: true,
      kind: "case-battle-won",
      amount: player.wonAmount,
      gameId: battle._id,
    });
  }
}
