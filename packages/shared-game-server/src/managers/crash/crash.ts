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

export default () => System.tryCatch(main)();

async function main() {
  const logger = getServerLogger({});
  logger.info("initializing crash game");
  console.log("initializing crash game");
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

   const round: CrashRoundDocument = {
    _id: roundId,
    timestamp: new Date(),
    serverSeed,
    serverSeedHash,
    status: "waiting",
    statusDate: new Date(),
    events: [],
  };

  await Database.collection("crash-rounds").insertOne(round);

  await Utility.wait(7000);

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

  await Utility.wait(3000);

  await startRound(round);
}

async function startRound(round: CrashRoundDocument) {
  if (round.status !== "pending") {
    return;
  }

  const { id: eosBlockId } = await Random.getEosBlock(round.eosBlockNum);

  const multiplierCrash = Random.getMultiplier({
    serverSeed: round.serverSeed,
    clientSeed: eosBlockId,
    nonce: round._id,
    maxValue: 15,
  });

  const statusDate = new Date();

  await Database.collection("crash-rounds").updateOne(
    { _id: round._id },
    {
      $set: {
        status: "simulating",
        statusDate,
        multiplierCrash,
        eosBlockId,
      },
    },
  );

  const roundTime = 1.0024 * Math.pow(1.0718, multiplierCrash);
  console.log("roundTime", roundTime, multiplierCrash);
  await Utility.wait(roundTime);

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

  await Database.collection("crash-rounds").updateOne(
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
  
  await Utility.wait(5000);

  await createRound();
}

async function processTickets(round: CrashRoundDocument) {
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
  round: CrashRoundDocument & { status: "completed" };
  ticket: CrashTicketDocument;
}) {
  const multiplierCrash = round.multiplierCrash;
  const betMultiplier = ticket.multiplierCrashed ?? 0;
  const won = betMultiplier >= multiplierCrash;
  
  const wonAmount = won ? Math.round(ticket.betAmount * betMultiplier) : 0;

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