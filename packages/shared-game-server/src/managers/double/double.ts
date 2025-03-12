import { Utility } from "@core/services/utility";
import { DoubleRoundDocument } from "@core/types/double/DoubleRoundDocument";
import { DoubleTicketDocument } from "@core/types/double/DoubleTicketDocument";
import { DoubleRoll } from "@core/types/double/DoubleRoll";
import { Intimal } from "@core/services/intimal";
import { Double } from "@core/services/double";
import { Numbers } from "@core/services/numbers";
import { System } from "@server/services/system";
import { Database } from "@server/services/database";
import { Ids } from "@server/services/ids";
import { Random } from "@server/services/random";
import { Transactions } from "@server/services/transactions";
import { Site } from "@server/services/site";
import { Chat } from "@server/services/chat";
import { Users } from "@server/services/users";

export default () => System.tryCatch(main)();

async function main() {
  const existing = await Database.collection("double-rounds").findOne({
    status: { $ne: "completed" },
  });

  if (existing) {
    switch (existing.status) {
      case "waiting":
        return await setupRound(existing);
      case "pending":
        return await startRound(existing);
      case "simulating":
        return await completeRound(existing);
      default:
        throw new Error(`Invalid status: ${existing.status}`);
    }
  } else {
    await createRound();
  }
}

async function createRound() {
  const roundId = await Ids.incremental({
    key: "doubleRoundId",
    baseValue: 1000000,
    batchSize: 1,
  });

  const serverSeed = Ids.secret();
  const serverSeedHash = Random.hashServerSeed(serverSeed);

  const round: DoubleRoundDocument = {
    _id: roundId,
    timestamp: new Date(),
    serverSeed,
    serverSeedHash,
    status: "waiting",
    statusDate: new Date(),
  };

  await Database.collection("double-rounds").insertOne(round);

  await Utility.wait(15000);

  await setupRound(round);
}

async function setupRound(round: DoubleRoundDocument) {
  const blockNow = await Random.getEosBlockNow();
  const eosBlockNum = blockNow.eosBlockNum + 4;
  const statusDate = new Date();

  await Database.collection("double-rounds").updateOne(
    { _id: round._id },
    {
      $set: {
        status: "pending",
        statusDate,
        eosBlockNum,
        eosCommitDate: statusDate,
      },
    },
  );

  round.status = "pending";
  round.statusDate = statusDate;
  round.eosBlockNum = eosBlockNum;

  await Utility.wait(3000);

  await startRound(round);
}

async function startRound(round: DoubleRoundDocument) {
  if (round.status !== "pending") {
    return;
  }

  const { id: eosBlockId } = await Random.getEosBlock(round.eosBlockNum);

  const rollValue = Random.getRoll({
    serverSeed: round.serverSeed,
    clientSeed: eosBlockId,
    nonce: round._id,
    maxValue: 15,
  });

  const roll: DoubleRoll = {
    value: rollValue,
    color: Double.getColor(rollValue),
    bait: Double.isBait(rollValue),
    offset: Numbers.randomInt(4, 96),
  };

  const statusDate = new Date();

  await Database.collection("double-rounds").updateOne(
    { _id: round._id },
    {
      $set: {
        status: "simulating",
        statusDate,
        roll,
        eosBlockId,
      },
    },
  );

  await Utility.wait(7000);

  await completeRound({
    ...round,
    status: "simulating",
    statusDate,
    roll,
    eosBlockId,
  });
}

async function completeRound(round: DoubleRoundDocument) {
  if (round.status !== "simulating") {
    return;
  }

  const statusDate = new Date();

  await Database.collection("double-rounds").updateOne(
    { _id: round._id },
    {
      $set: {
        status: "completed",
        statusDate,
      },
    },
  );

  System.tryCatch(processTickets)({
    ...round,
    status: "completed",
    statusDate,
  });

  System.tryCatch(handleStreaks)(round.roll);

  await Utility.wait(4500);

  await createRound();
}

async function processTickets(round: DoubleRoundDocument) {
  if (round.status !== "completed") {
    return;
  }

  const cursor = Database.collection("double-tickets").find({
    roundId: round._id,
    processed: { $exists: false },
  });

  for await (const ticket of cursor) {
    await System.tryCatch(processTicket)({ round, ticket });
  }
}

async function processTicket({
  round,
  ticket,
}: {
  round: DoubleRoundDocument & { status: "completed" };
  ticket: DoubleTicketDocument;
}) {
  const roll = round.roll.value;
  const betKind = ticket.betKind;
  const won = Double.isWinningBet(betKind, roll);
  const multiplier = won ? Double.getMultiplierFromBetKind(betKind) : 0;
  const wonAmount = won ? Math.round(ticket.betAmount * multiplier) : 0;

  await Database.collection("double-tickets").updateOne(
    {
      _id: ticket._id,
    },
    {
      $set: {
        won,
        wonAmount,
        multiplier,
        processed: true,
        processDate: new Date(),
      },
    },
  );

  await Site.trackBet({
    game: "double",
    user: ticket.user,
    betAmount: ticket.betAmount,
    won,
    wonAmount,
  });

  if (won) {
    const user = await Database.collection("users").findOne({
      _id: ticket.user.id,
    });

    if (!user) {
      throw new Error("User lookup failed.");
    }

    await Transactions.createTransaction({
      user,
      autoComplete: true,
      kind: "double-won",
      amount: wonAmount,
      roundId: round._id,
      gameId: ticket._id,
      multiplier,
    });

    await Site.trackActivity({
      kind: "double-win",
      user: Users.getBasicUser(user),
      amount: wonAmount,
      betKind,
    });

    if (wonAmount >= Intimal.fromDecimal(multiplier === 2 ? 1000 : 500)) {
      await Chat.createMessage({
        agent: "system",
        channel: null,
        kind: "double-win",
        user: Users.getBasicUser(user),
        wonAmount,
        betKind,
      });
    }
  }
}

const history: DoubleRoll[] = [];

async function handleStreaks(roll: DoubleRoll) {
  history.unshift(roll);

  if (history.length > 1000) {
    history.length = 1000;
  }

  let greenStreak = 0;
  let baitStreak = 0;

  for (let i = 0; i < history.length; i++) {
    if (history[i].color === "green") {
      greenStreak = i;
      break;
    }
  }

  for (let i = 0; i < history.length; i++) {
    if (history[i].bait) {
      baitStreak = i;
      break;
    }
  }

  if (greenStreak >= 50 && greenStreak % 10 === 0) {
    await Chat.createMessage({
      agent: "system",
      channel: null,
      kind: "double-streak",
      streakKind: "green",
      streakCount: greenStreak,
    });
  }

  if (baitStreak >= 30 && baitStreak % 5 === 0) {
    await Chat.createMessage({
      agent: "system",
      channel: null,
      kind: "double-streak",
      streakKind: "bait",
      streakCount: baitStreak,
    });
  }
}
