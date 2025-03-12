import { Intimal } from "@core/services/intimal";
import { Utility } from "@core/services/utility";
import { DiceTicketDocument } from "@core/types/dice/DiceTicketDocument";
import { Site } from "@server/services/site";
import { Chat } from "@server/services/chat";
import { Database } from "@server/services/database";
import { System } from "@server/services/system";
import { Transactions } from "@server/services/transactions";
import { Users } from "@server/services/users";

export default () => System.tryCatch(main)();

async function main() {
  const cursor = Database.collection("dice-tickets").find(
    { processed: { $exists: false } },
    { sort: { timestamp: 1 } },
  );

  for await (const ticket of cursor) {
    System.tryCatch(processTicket)(ticket);
  }

  watch();
}

function watch() {
  const changeStream = Database.collection("dice-tickets").watch([
    { $match: { operationType: "insert" } },
  ]);

  changeStream.on("change", (e) => {
    if (e.operationType === "insert" && e.fullDocument) {
      System.tryCatch(processTicket)(e.fullDocument);
    }
  });

  changeStream.on("error", (err) => {
    System.handleError(err);
    changeStream.removeAllListeners();
    watch();
  });
}

async function processTicket(ticket: DiceTicketDocument) {
  await Utility.wait(250);

  const { matchedCount } = await Database.collection("dice-tickets").updateOne(
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
    game: "dice",
    user: Users.getBasicUser(user),
    betAmount: ticket.betAmount,
    won: ticket.won,
    wonAmount: ticket.wonAmount,
  });

  if (ticket.won) {
    await Transactions.createTransaction({
      user,
      autoComplete: true,
      kind: "dice-won",
      amount: ticket.wonAmount,
      gameId: ticket._id,
      targetValue: ticket.targetValue,
      targetKind: ticket.targetKind,
      multiplier: ticket.multiplier,
    });

    await Site.trackActivity({
      kind: "dice-win",
      user: Users.getBasicUser(user),
      amount: ticket.wonAmount,
    });

    if (ticket.multiplier >= 2 && ticket.wonAmount >= Intimal.fromDecimal(500)) {
      await Chat.createMessage({
        agent: "system",
        channel: null,
        kind: "dice-win",
        user: Users.getBasicUser(user),
        multiplier: ticket.multiplier,
        wonAmount: ticket.wonAmount,
      });
    }
  }
}
