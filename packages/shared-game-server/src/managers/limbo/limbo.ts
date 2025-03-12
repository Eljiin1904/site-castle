import { Intimal } from "@core/services/intimal";
import { Utility } from "@core/services/utility";
import { LimboTicketDocument } from "@core/types/limbo/LimboTicketDocument";
import { Site } from "@server/services/site";
import { Chat } from "@server/services/chat";
import { Database } from "@server/services/database";
import { System } from "@server/services/system";
import { Transactions } from "@server/services/transactions";
import { Users } from "@server/services/users";

export default () => System.tryCatch(main)();

async function main() {
  const cursor = Database.collection("limbo-tickets").find(
    { processed: { $exists: false } },
    { sort: { timestamp: 1 } },
  );

  for await (const ticket of cursor) {
    System.tryCatch(processTicket)(ticket);
  }

  watch();
}

function watch() {
  const changeStream = Database.collection("limbo-tickets").watch([
    { $match: { operationType: "insert" } },
  ]);

  changeStream.on("change", (e) => {
    if (e.operationType === "insert" && e.fullDocument) {
      System.tryCatch(processTicket)(e.fullDocument);
    }
  });

  changeStream.on("error", (err) => {
    console.error(err.message);
    changeStream.removeAllListeners();
    watch();
  });
}

async function processTicket(ticket: LimboTicketDocument) {
  await Utility.wait(500);

  const { matchedCount } = await Database.collection("limbo-tickets").updateOne(
    {
      _id: ticket._id,
      processed: { $exists: false },
    },
    {
      $set: {
        processed: true,
        processDate: new Date(),
      },
    },
  );

  if (matchedCount === 0 || ticket.betAmount === 0) {
    return;
  }

  const user = await Database.collection("users").findOne({
    _id: ticket.user.id,
  });

  if (!user) {
    throw new Error("User lookup failed.");
  }

  await Site.trackBet({
    game: "limbo",
    user: Users.getBasicUser(user),
    betAmount: ticket.betAmount,
    won: ticket.won,
    wonAmount: ticket.wonAmount,
  });

  if (ticket.won) {
    await Transactions.createTransaction({
      user,
      autoComplete: true,
      kind: "limbo-won",
      amount: ticket.wonAmount,
      gameId: ticket._id,
      targetValue: ticket.targetValue,
      multiplier: ticket.multiplier,
    });

    await Site.trackActivity({
      kind: "limbo-win",
      user: Users.getBasicUser(user),
      amount: ticket.wonAmount,
    });

    if (ticket.multiplier >= 2 && ticket.wonAmount >= Intimal.fromDecimal(500)) {
      await Chat.createMessage({
        agent: "system",
        channel: null,
        kind: "limbo-win",
        user: Users.getBasicUser(user),
        multiplier: ticket.multiplier,
        wonAmount: ticket.wonAmount,
      });
    }
  }
}
