import { Utility } from "@core/services/utility";
import { Intimal } from "@core/services/intimal";
import { System } from "@server/services/system";
import { Database } from "@server/services/database";
import { Ids } from "@server/services/ids";
import { Random } from "@server/services/random";
import { Transactions } from "@server/services/transactions";
import { Site } from "@server/services/site";
import { Chat } from "@server/services/chat";
import { Users } from "@server/services/users";
import { getServerLogger } from "@core/services/logging/utils/serverLogger";
import { CrashRoundDocument } from "@core/types/crash/CrashRoundDocument";
import { CrashTicketDocument } from "@core/types/crash/CrashTicketDocument";
import { Crash } from "@core/services/crash";
import { CrashMultiplierDocument } from "@core/types/crash/CrashMultiplierDocument";

export default () => System.tryCatch(main)();

async function main() {
  const logger = getServerLogger({});
  logger.info("initializing crash game");
  const existing = await Database.collection("crash-rounds").findOne({
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
    key: "crashRoundId",
    baseValue: 1000000,
    batchSize: 1,
  });

  const gameCreatedDate = new Date();
  const round: CrashRoundDocument = {
    _id: roundId,
    timestamp: gameCreatedDate,
    status: "waiting",
    statusDate: gameCreatedDate,
  };

  await Database.collection("crash-rounds").insertOne(round);
  await addNextRoundTickets(round);
  await Utility.wait(Crash.roundTimes.waiting);
  await setupRound(round);
}

async function setupRound(round: CrashRoundDocument) {
  const blockNow = await Random.getEosBlockNow();
  const eosBlockNum = blockNow.eosBlockNum + 4;
  const statusDate = new Date();

  await Database.collection("crash-rounds").updateOne(
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

  await Utility.wait(Crash.roundTimes.pending);
  await startRound(round);
}

async function startRound(round: CrashRoundDocument) {
  if (round.status !== "pending") {
    return;
  }

  const { eosBlockId } = await Random.getEosBlock(round.eosBlockNum);
  const serverSeed = Ids.secret();
  const serverSeedHash = Random.hashServerSeed(serverSeed);

  let multiplier = 15;
  Random.getMultiplier({
    serverSeed: serverSeed,
    clientSeed: eosBlockId,
    nonce: round._id,
    maxValue: Crash.maxValue,
  });

  const multiplierId = await Ids.incremental({
    key: "crashMultiplierId",
    baseValue: 1000000,
    batchSize: 1,
  });

  const statusDate = new Date();
  const roundTime = Crash.getTimeForMultiplier(multiplier);
  const roundMultiplier: CrashMultiplierDocument = {
    _id: multiplierId,
    roundId: round._id,
    multiplier: multiplier,
    timestamp: statusDate,
    serverSeed: serverSeed,
    serverSeedHash: serverSeedHash,
    roundTime,
  };

  await Database.collection("crash-rounds").updateOne(
    { _id: round._id },
    {
      $set: {
        status: "simulating",
        statusDate,
        startDate: statusDate,
      },
    },
  );
  await Database.collection("crash-multipliers").insertOne(roundMultiplier);

  const intervalId = setInterval(async () => {
    const currentTime = new Date();
    const timer = currentTime.getTime() - statusDate.getTime() - Crash.roundTimes.delay;
    const currentMultiplier = Crash.getMultiplierForTime(timer);
    if (currentMultiplier >= multiplier) {
      clearInterval(intervalId);
      return;
    }

    triggerAutoCashTickets(round._id, currentMultiplier);
  }, 150);

  await Utility.wait(roundTime);
  clearInterval(intervalId);

  await completeRound({
    ...round,
    status: "simulating",
    statusDate,
    multiplier,
    eosBlockId,
  });
}

async function completeRound(round: CrashRoundDocument) {
  if (round.status !== "simulating") {
    return;
  }

  const statusDate = new Date();

  await Utility.wait(Crash.roundTimes.delay);
  await triggerAutoCashTickets(round._id, round.multiplier);

  await System.tryCatch(processTickets)({
    ...round,
    status: "completed",
    statusDate,
  });

  const totalWins = await Database.collection("crash-tickets").countDocuments({
    roundId: round._id,
    processed: true,
    won: true,
  });

  await Database.collection("crash-rounds").updateOne(
    { _id: round._id },
    {
      $set: {
        status: "completed",
        statusDate,
        completedDate: statusDate,
        multiplier: round.multiplier,
        won: totalWins > 0,
      },
    },
  );

  await Utility.wait(Crash.roundTimes.completed);
  await createRound();
}

async function processTickets(round: CrashRoundDocument) {
  if (round.status !== "completed") {
    return;
  }

  const cursor = Database.collection("crash-tickets").find({
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
  round: CrashRoundDocument;
  ticket: CrashTicketDocument;
}) {
  const multiplier = round.multiplier ?? 1;
  const betMultiplier = ticket.multiplierCrashed ?? 0;
  let won = ticket.cashoutTriggered ? betMultiplier > 1 && betMultiplier <= multiplier : false;

  let wonAmount = won ? Math.round(ticket.betAmount * betMultiplier) : 0;
  await Database.collection("crash-tickets").updateOne(
    {
      _id: ticket._id,
    },
    {
      $set: {
        won,
        wonAmount,
        processed: true,
        processDate: new Date(),
      },
    },
  );

  await Site.trackBet({
    game: "crash",
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
      kind: "crash-won",
      amount: wonAmount,
      roundId: round._id,
      gameId: ticket._id,
      multiplier: betMultiplier,
      roundMultiplier: multiplier,
    });

    await Site.trackActivity({
      kind: "crash-win",
      user: Users.getBasicUser(user),
      amount: wonAmount,
      multiplier: betMultiplier,
    });

    if (wonAmount >= Intimal.fromDecimal(betMultiplier >= 2 ? 1000 : 500)) {
      await Chat.createMessage({
        agent: "system",
        channel: null,
        kind: "crash-win",
        user: Users.getBasicUser(user),
        wonAmount,
        multiplier: betMultiplier,
      });
    }
  }
}
async function addNextRoundTickets(round: CrashRoundDocument) {
  //Add next round tickets to current round
  const nextRoundTickets = await Database.collection("crash-next-tickets")
    .find({
      "user.id": { $exists: true },
    })
    .toArray();

  if (nextRoundTickets.length === 0) return;

  for (const ticket of nextRoundTickets) {
    const ticketId = await Ids.incremental({
      key: "crashTicketId",
      baseValue: 1000000,
      batchSize: 1,
    });

    const newTicket: CrashTicketDocument = {
      ...ticket,
      _id: ticketId,
      roundId: round._id,
    };

    await Database.collection("crash-tickets").insertOne(newTicket);
  }

  // Remove next round tickets
  await Database.collection("crash-next-tickets").deleteMany({
    "user.id": { $exists: true },
  });

  // Update next round tickets transactions with roundId
  await Database.collection("transactions").updateMany(
    { roundId: Crash.nextRoundId, kind: "crash-bet" },
    { $set: { roundId: round._id } },
  );
}
async function triggerAutoCashTickets(roundId: string, multiplier?: number) {
  if (!multiplier || multiplier <= 1) return;
  await Database.collection("crash-tickets").updateMany(
    {
      roundId: roundId,
      processed: { $exists: false },
      multiplierCrashed: { $exists: false },
      cashoutTriggered: { $exists: false },
      targetMultiplier: { $gt: 1, $lte: multiplier },
    },
    [
      {
        $set: {
          cashoutTriggered: true,
          cashoutTriggeredDate: new Date(),
          multiplierCrashed: "$targetMultiplier",
          autoCashedTriggerd: true,
        },
      },
    ],
  );
}
