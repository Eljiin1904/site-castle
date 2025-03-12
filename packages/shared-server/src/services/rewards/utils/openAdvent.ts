import { subHours } from "date-fns";
import { UserDocument } from "@core/types/users/UserDocument";
import { AdventTicketDocument } from "@core/types/rewards/AdventTicketDocument";
import { Intimal } from "@core/services/intimal";
import { Numbers } from "@core/services/numbers";
import { Items } from "@core/services/items";
import { Database } from "#server/services/database";
import { Users } from "#server/services/users";
import { Transactions } from "#server/services/transactions";
import { Ids } from "#server/services/ids";
import { Chat } from "#server/services/chat";
import { HandledError } from "#server/services/errors";
import { Site } from "#server/services/site";

export async function openAdvent({
  user,
  day,
}: {
  user: UserDocument;
  day: number;
}) {
  const { holiday } = await Site.meta.cache();

  if (!holiday) {
    throw new HandledError("No active holiday.");
  }

  const report = await Users.aggregateReport({
    userId: user._id,
    minDate: subHours(Date.now(), 24),
    maxDate: new Date(),
  });

  if (report.wagerAmount < Intimal.fromDecimal(100)) {
    throw new HandledError(
      "You must wager at least 100 tokens in the last 24 hours.",
    );
  }

  const todayExists = await Database.exists("advent-tickets", {
    userId: user._id,
    holidayId: holiday.id,
    day,
  });

  if (todayExists) {
    throw new HandledError("Already claimed for today.");
  }

  const previousExists = await Database.exists("advent-tickets", {
    userId: user._id,
    holidayId: holiday.id,
    day: day - 1,
  });

  let evRate = 0.02;

  if (holiday.adventBonusDays.includes(day)) {
    evRate += 0.05;
  }

  // Opened yesterday
  if (previousExists) {
    evRate += 0.01;
  }

  // Deposited >= 20
  if (report.depositAmount >= Intimal.fromDecimal(20)) {
    evRate += 0.01;
  }

  // Wagered >= 5000
  if (report.wagerAmount >= Intimal.fromDecimal(5000)) {
    evRate += 0.01;
  }

  // Linked Discord
  if (user.discordId) {
    evRate += 0.01;
  }

  const multiplierRoll = Numbers.randomInt(1, 1e5);
  const multiplier = rollMultiplier(multiplierRoll);

  let targetValue = Math.round(report.evAmount * evRate * multiplier);
  targetValue = Math.max(targetValue, Intimal.fromDecimal(0.01));
  targetValue = Math.min(targetValue, Intimal.fromDecimal(9522.73));

  const itemDocument = await Database.collection("items").findOne(
    {
      "loot.tokenValue": { $lte: targetValue },
    },
    {
      sort: { "loot.tokenValue": -1 },
    },
  );

  if (!itemDocument) {
    throw new HandledError("Failed to find loot match.");
  }

  const item = Items.getLoot(itemDocument);

  const ticket: AdventTicketDocument = {
    _id: Ids.object(),
    timestamp: new Date(),
    userId: user._id,
    holidayId: holiday.id,
    day,
    targetValue,
    multiplier,
    item,
  };

  await Database.collection("advent-tickets").insertOne(ticket);

  await Transactions.createTransaction({
    user,
    autoComplete: true,
    kind: "reward-advent-item",
    amount: item.lootValue,
    targetValue,
    multiplier,
    item,
  });

  await Site.trackActivity({
    kind: "advent-item",
    user: Users.getBasicUser(user),
    amount: item.lootValue,
    item,
  });

  if (multiplier > 1 && item.lootValue > Intimal.fromDecimal(100)) {
    await Chat.createMessage({
      agent: "system",
      channel: null,
      kind: "advent-bonus",
      user: Users.getBasicUser(user),
      item,
    });
  }

  return ticket;
}

function rollMultiplier(roll: number) {
  if (roll >= 1e5) {
    return 1000;
  } else if (roll >= 99998) {
    return 500;
  } else if (roll >= 99994) {
    return 250;
  } else if (roll >= 99984) {
    return 100;
  } else if (roll >= 99974) {
    return 75;
  } else if (roll >= 99924) {
    return 50;
  } else if (roll >= 99874) {
    return 25;
  } else if (roll >= 99301) {
    return 10;
  } else if (roll >= 98301) {
    return 5;
  } else if (roll >= 96301) {
    return 2;
  } else if (roll >= 92301) {
    return 2;
  } else if (roll >= 86301) {
    return 1.5;
  } else if (roll >= 78001) {
    return 1.25;
  } else if (roll >= 63001) {
    return 1;
  } else if (roll >= 43001) {
    return 0.75;
  } else if (roll >= 23001) {
    return 0.5;
  } else {
    return 0.4;
  }
}
