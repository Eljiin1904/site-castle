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

  const serverSeed = Ids.secret();
  const serverSeedHash = Random.hashServerSeed(serverSeed);
  const gameCreatedDate = new Date();

  const round: CrashRoundDocument = {
    _id: roundId,
    timestamp: gameCreatedDate,
    serverSeed,
    serverSeedHash,
    status: "waiting",
    statusDate: gameCreatedDate,
    elapsedTime: 0,
    multiplier: 0
  };

  await Database.collection("crash-rounds").insertOne(round);
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

  const { id: eosBlockId } = await Random.getEosBlock(round.eosBlockNum);

  let multiplierCrash =  Random.getMultiplier({
    serverSeed: round.serverSeed,
    clientSeed: eosBlockId,
    nonce: round._id,
    maxValue: Crash.maxValue,
  });

  const statusDate = new Date();

  await Database.collection("crash-rounds").updateOne(
    { _id: round._id },
    {
      $set: {
        status: "simulating",
        statusDate,
        startDate: statusDate
      },
    },
  );
 
  const roundTime = Crash.getTimeForMultiplier(multiplierCrash);
  const intervalId = setInterval(() => {
  
    const currentTime = new Date();
    const timer = currentTime.getTime() - statusDate.getTime();
    const currentMultiplier = Crash.getMultiplierForTime(timer);
    if(currentMultiplier >= multiplierCrash) {
      clearInterval(intervalId);
      return;
    }
    Database.collection("crash-rounds").updateOne(
      { _id: round._id },
      {
        $set: {
          multiplier:currentMultiplier,
          elapsedTime: timer,
          statusDate: currentTime,
        },
      },
    );
    
    Database.collection("crash-tickets").updateMany(
      { roundId: round._id, 
        processed: {$exists: false},
        multiplierCrashed: { $exists: false },
        cashoutTriggered: { $exists: false },   
        targetMultiplier: { $gt: 1, $lte: currentMultiplier },
      },
      [{
        $set: {
          cashoutTriggered: true,
          cashoutTriggeredDate: currentTime,
          multiplierCrashed: "$targetMultiplier",
          autoCashedTriggerd: true,
        },
      }]
    );
  }, 100);

  await Utility.wait(roundTime);
  clearInterval(intervalId);
  
  await completeRound({
    ...round,
    status: "simulating",
    statusDate,
    multiplierCrash,
    eosBlockId,
  });
}

async function completeRound(round: CrashRoundDocument) {
  if (round.status !== "simulating") {
    return;
  }

  const statusDate = new Date();
 
  await Utility.wait(Crash.roundTimes.delay);
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
        multiplierCrash: round.multiplierCrash,
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
  round: CrashRoundDocument & { status: "completed" };
  ticket: CrashTicketDocument;
}) {
  const multiplierCrash = round.multiplierCrash;
  const betMultiplier =  ticket.multiplierCrashed ?? 0;
  let won = ticket.cashoutTriggered ? betMultiplier > 1 && betMultiplier <= multiplierCrash : false;
  
  let wonAmount = won ? Math.round(ticket.betAmount * betMultiplier) : 0;
  let autoCashedTriggered = false;
  let cashoutTriggered = ticket.cashoutTriggered;
  if(!won) {

    const targetMultiplier = ticket.targetMultiplier ?? 1;

    if(targetMultiplier > 1 && targetMultiplier <= multiplierCrash) {

      won = true;
      wonAmount = Math.round(ticket.betAmount * targetMultiplier);
      autoCashedTriggered = true; 
      cashoutTriggered = true;
    }
  }

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
        autoCashedTriggered,
        cashoutTriggered
      },
    },
  );

  await Site.trackBet({
    game: "crash",
    user: ticket.user,
    betAmount: ticket.betAmount,
    won,
    wonAmount
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
      roundMultiplier: multiplierCrash,
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