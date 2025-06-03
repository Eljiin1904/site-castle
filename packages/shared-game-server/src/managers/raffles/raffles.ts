import { Utility } from "@core/services/utility";
import { RaffleDocument } from "@core/types/rewards/RaffleDocument";
import { System } from "@server/services/system";
import { Database } from "@server/services/database";
import { Random } from "@server/services/random";
import { Rewards } from "@server/services/rewards";
import { Users } from "@server/services/users";

export default () => System.tryCatch(main)();

async function main() {
  setInterval(System.tryCatch(onReportInterval), 15000);
  setInterval(System.tryCatch(onProcessInterval), 5000);
}

async function onReportInterval() {
  const raffles = Database.collection("raffles").find({
    endDate: { $gt: new Date() },
    startDate: { $lt: new Date() },
  });

  for await (const raffle of raffles) {
    const reports = await Rewards.aggregateRaffleReports({ raffle });

    await Database.collection("raffles").updateOne(
      { _id: raffle._id },
      {
        $set: {
          reports,
          lastReportDate: new Date(),
        },
      },
    );
  }
}

async function onProcessInterval() {
  const raffle = await Database.collection("raffles").findOneAndUpdate(
    {
      endDate: { $lt: new Date() },
      status: "open",
    },
    {
      $set: {
        status: "starting",
        statusDate: new Date(),
      },
    },
  );

  if (!raffle) {
    return;
  }

  System.tryCatch(handleFairness)(raffle);
}

async function handleFairness(raffle: RaffleDocument) {
  const blockNow = await Random.getEosBlockNow();
  const eosBlockNum = blockNow.eosBlockNum + 4;
  const eosCommitDate = new Date();

  await Database.collection("raffles").updateOne(
    { _id: raffle._id },
    {
      $set: {
        status: "pending",
        statusDate: new Date(),
        eosBlockNum,
        eosCommitDate,
      },
    },
  );

  await Utility.wait(3000);

  const { eosBlockId } = await Random.getEosBlock(eosBlockNum);

  await Database.collection("raffles").updateOne(
    { _id: raffle._id },
    {
      $set: {
        status: "drawing",
        statusDate: new Date(),
        eosBlockId,
      },
    },
  );

  await handleDrawing({
    ...raffle,
    status: "drawing",
    statusDate: new Date(),
    eosBlockId,
    eosBlockNum,
    eosCommitDate,
  });
}

async function handleDrawing(raffle: RaffleDocument) {
  if (raffle.status !== "drawing") {
    return;
  }

  const ticketIndexes = [...Array(raffle.ticketCount)].map((x, i) => i);

  for (let round = 0; round < raffle.items.length; round++) {
    const item = raffle.items[round];

    await Database.collection("raffles").updateOne(
      { _id: raffle._id },
      {
        $inc: {
          round: 1,
        },
      },
    );

    await Utility.wait(5000);

    const rollIndex = Random.getRoll({
      serverSeed: raffle.serverSeed,
      clientSeed: raffle.eosBlockId,
      nonce: `${raffle._id}-${round}`,
      minValue: 0,
      maxValue: ticketIndexes.length - 1,
    });

    const ticketIndex = ticketIndexes[rollIndex];

    ticketIndexes.splice(rollIndex, 1);

    const ticket = await Database.collection("raffle-tickets").findOne({
      raffleId: raffle._id,
      ticketIndex,
    });

    if (!ticket) {
      throw new Error(`Raffle: Ticket lookup failed, ${ticketIndex}`);
    }

    const user = await Database.collection("users").findOne({
      _id: ticket.userId,
    });

    if (!user) {
      throw new Error(`Raffle: User lookup failed, ${ticket.userId}`);
    }

    await Rewards.createClaim({
      kind: "raffle-payout",
      userId: user._id,
      tokenAmount: item.lootValue,
      raffleId: raffle._id,
      round,
      ticketId: ticket._id,
      ticketIndex,
    });

    await Database.collection("raffles").updateOne(
      { _id: raffle._id },
      {
        $push: {
          winners: Users.getBasicUser(user),
        },
      },
    );

    await Utility.wait(5000);
  }

  await completeRaffle(raffle);
}

async function completeRaffle(raffle: RaffleDocument) {
  if (raffle.status !== "drawing") {
    return;
  }

  await Database.collection("raffles").updateOne(
    { _id: raffle._id },
    {
      $set: {
        status: "completed",
        statusDate: new Date(),
      },
    },
  );
}
