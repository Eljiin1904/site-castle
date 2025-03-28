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
import { SiteJackPotDocument } from "../../../../shared-core/src/types/site/SiteJackpotDocument";

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

  let isJackpot = false;

  // Get Sum of Bets of Round
  const settings = await Site.settings.cache();
  const roundSum = await Database.collection("double-tickets")
    .aggregate([
      {
        $match: {
          roundId: round._id,
        },
      },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$betAmount" },
        },
      },
    ])
    .toArray();

  // Add percentage to jackpot
  const roundPotAmount =
    roundSum && roundSum[0].betAmount
      ? roundSum[0].betAmount + roundSum[0].betAmount * settings.jackpotThreshold
      : 0;

  // Grab latest pending jackpot or create one if doesnt exist
  // gameIds less than 3
  const existing = await Database.collection("site-jackpot").findOne({
    status: { $eq: "pending" },
    game: { $eq: "double" },
  });
  if (existing) {
    const potAmount = existing.potAmount + roundPotAmount;
    if (round.roll.color == "green" && existing.gameIds.length < 3) {
      const newGameId: string[] = [...existing.gameIds, round._id];

      await Database.collection("site-jackpot").updateOne(
        { _id: existing._id },
        {
          $set: {
            potAmount: potAmount,
            gameIds: newGameId,
          },
        },
      );
      if (newGameId.length == 3) isJackpot = true;
    } else if (round.roll.color != "green") {
      // Reset the jackpot but add updated potAmount
      await Database.collection("site-jackpot").updateOne(
        { _id: existing._id },
        {
          $set: {
            potAmount: potAmount,
            gameIds: [],
          },
        },
      );
    }
    // Create new Jackpot add new Game Id
  } else {
    // Create new Jackpot add new Game Id if roll is green else provide empty gameIds
    const newJackpot: SiteJackPotDocument = {
      _id: Ids.object(),
      potAmount: roundPotAmount,
      gameIds: round.roll.color == "green" ? [round._id] : [],
      status: "pending",
      game: "double",
      timestamp: new Date(),
    };
    await Database.collection("site-jackpot").insertOne(newJackpot);
  }

  const cursor = Database.collection("double-tickets").find({
    roundId: round._id,
    processed: { $exists: false },
  });

  // if isJackpot, getGame ids, get tickets of each round that are green
  // Split pot by three and add pot amount to each user.
  // Make query clarify that user must be unique to get proper user amount
  // After providing users with there money, mark jackpot as complete
  // Create aggregate to group double tickets by gameIds that match winning gameIds and those who chose green
  // iterate each group and add amount to each based on (potAmount / 3) / (# winners per Round)
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
