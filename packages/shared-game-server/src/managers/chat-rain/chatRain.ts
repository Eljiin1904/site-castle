import { addMinutes } from "date-fns";
import { Utility } from "@core/services/utility";
import { ChatRainSplits } from "@core/types/chat/ChatRainSplits";
import { Intimal } from "@core/services/intimal";
import { Numbers } from "@core/services/numbers";
import { ChatRainDocument } from "@core/types/chat/ChatRainDocument";
import { System } from "@server/services/system";
import { Database } from "@server/services/database";
import { Ids } from "@server/services/ids";
import { Transactions } from "@server/services/transactions";
import { Site } from "@server/services/site";
import { Chat } from "@server/services/chat";

export default () => System.tryCatch(main)();

async function main() {
  System.tryCatch(init)();
  setInterval(System.tryCatch(updateRain), 5000);
}

async function init() {
  await endExisting();
  await loop();
}

async function endExisting() {
  const existing = await Database.collection("chat-rains").findOne({
    endDate: { $gt: new Date() },
  });

  if (existing) {
    await endRain(existing);
  }
}

async function loop() {
  while (true) {
    try {
      const rain = await startRain();
      if (rain) {
        await endRain(rain);
      } else {
        await Utility.wait(1000);
      }
    } catch (err) {
      System.handleError(err);
      await Utility.wait(1000);
    }
  }
}

async function startRain() {
  const settings = await Site.settings.cache();
  const interval = Numbers.randomInt(
    settings.rainMinInterval,
    settings.rainMaxInterval,
  );

  if (!settings.rainEnabled) {
    return;
  }

  const duration = settings.rainDuration;
  const baseAmount = Intimal.fromDecimal(settings.rainBaseAmount);
  const startDate = new Date();
  const openDate = addMinutes(startDate, interval - duration);
  const endDate = addMinutes(startDate, interval);

  const rain: ChatRainDocument = {
    _id: Ids.object(),
    startDate,
    openDate,
    endDate,
    interval,
    duration,
    baseAmount,
    taxAmount: 0,
    tipAmount: 0,
    totalAmount: baseAmount,
    ticketCount: 0,
  };

  await Database.collection("chat-rains").insertOne(rain);

  return rain;
}

async function updateRain() {
  const rain = await Database.collection("chat-rains").findOne({
    endDate: { $gt: new Date() },
    processed: { $exists: false },
  });

  if (!rain) {
    return;
  }

  const { taxAmount, tipAmount } = await Chat.aggregateRainReport({
    minDate: rain.startDate,
    maxDate: rain.endDate,
  });

  const totalAmount = rain.baseAmount + tipAmount + taxAmount;

  await Database.collection("chat-rains").updateOne(
    {
      _id: rain._id,
      processed: { $exists: false },
    },
    {
      $set: { taxAmount, tipAmount, totalAmount },
    },
  );
}

async function endRain(rain: ChatRainDocument) {
  await Utility.wait(rain.endDate.getTime() - Date.now());

  const { taxAmount, tipAmount } = await Chat.aggregateRainReport({
    minDate: rain.startDate,
    maxDate: rain.endDate,
  });

  const totalAmount = rain.baseAmount + tipAmount + taxAmount;

  const cursor = Database.collection("chat-rain-tickets").find(
    { rainId: rain._id },
    { projection: { _id: 1, user: 1, stats: 1 } },
  );

  const players = [];

  let totalLevels = 0;
  let totalXpGained = 0;
  let depositCount = 0;
  let wagerCount = 0;
  let kycCount = 0;

  for await (const ticket of cursor) {
    const user = {
      ticketId: ticket._id,
      user: ticket.user,
      level: ticket.stats.level,
      xpGained: Intimal.toDecimal(ticket.stats.xpGained, 0),
      splitDeposit: ticket.stats.depositAmount >= Intimal.fromDecimal(20),
      splitWager: ticket.stats.wagerAmount >= Intimal.fromDecimal(1000),
      splitKyc: ticket.stats.kycTier >= 2,
    };

    players.push(user);

    totalLevels += user.level;
    totalXpGained += user.xpGained;
    depositCount += user.splitDeposit ? 1 : 0;
    wagerCount += user.splitWager ? 1 : 0;
    kycCount += user.splitKyc ? 1 : 0;
  }

  const payouts = [];

  let everyoneRate = 0.1;

  if (depositCount === 0) {
    everyoneRate += 0.15;
  }
  if (wagerCount === 0) {
    everyoneRate += 0.15;
  }
  if (kycCount === 0) {
    everyoneRate += 0.2;
  }

  for (const player of players) {
    const splits: ChatRainSplits = {
      everyone: Math.floor((totalAmount * everyoneRate) / players.length),
      level: Math.floor(((totalAmount * 0.15) / totalLevels) * player.level),
      deposit: player.splitDeposit
        ? Math.floor((totalAmount * 0.15) / depositCount)
        : 0,
      wager: player.splitWager
        ? Math.floor((totalAmount * 0.15) / wagerCount)
        : 0,
      xp: Math.floor(((totalAmount * 0.25) / totalXpGained) * player.xpGained),
      kyc: player.splitKyc ? Math.floor((totalAmount * 0.2) / kycCount) : 0,
    };

    const splitAmount = Object.values(splits).reduce(
      (acc, value) => (acc += value),
      0,
    );

    payouts.push({
      ticketId: player.ticketId,
      user: player.user,
      splits,
      splitAmount,
    });
  }

  await Database.collection("chat-rains").updateOne(
    { _id: rain._id },
    {
      $set: {
        taxAmount,
        tipAmount,
        totalAmount,
        ticketCount: players.length,
        processed: true,
        processDate: new Date(),
      },
    },
  );

  if (players.length > 0) {
    const topPayouts = payouts
      .slice()
      .sort((a, b) => b.splitAmount - a.splitAmount);

    if (topPayouts.length > 3) {
      topPayouts.length = 3;
    }

    const topPlayers = topPayouts.map((x) => x.user.name);

    await Chat.createMessage({
      kind: "rain-payout",
      channel: null,
      agent: "system",
      rainId: rain._id,
      topPlayers,
      playerCount: players.length,
      totalAmount,
    });
  }

  for (const payout of payouts) {
    const user = await Database.collection("users").findOne({
      _id: payout.user.id,
    });

    if (!user) {
      continue;
    }

    await Transactions.createTransaction({
      user,
      autoComplete: true,
      kind: "rain-payout",
      amount: payout.splitAmount,
      rainId: rain._id,
      splits: payout.splits,
    });

    await Database.collection("chat-rain-tickets").updateOne(
      { _id: payout.ticketId },
      {
        $set: {
          splitAmount: payout.splitAmount,
          processed: true,
          processDate: new Date(),
        },
      },
    );

    await Database.collection("users").updateOne(
      { _id: user._id },
      {
        $set: {
          "meta.nextRainWager":
            (user.stats.wagerAmount || 0) + payout.splitAmount,
        },
      },
    );
  }
}
