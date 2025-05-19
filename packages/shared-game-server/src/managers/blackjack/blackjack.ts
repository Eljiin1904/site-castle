import { getInsuranceBetAmount } from "#core/services/blackjack/utils/getInsuranceBetAmount";
import { Intimal } from "#core/services/intimal";
import { Utility } from "#core/services/utility";
import { BlackjackEventDocument } from "#core/types/blackjack/BlackjackEventDocument";
import { BlackjackTicketDocument } from "#core/types/blackjack/BlackjackTicketDocument";
import { BlackjackSidebetWonData } from "#core/types/transactions/TransactionKind";
import { UserDocument } from "#core/types/users/UserDocument";
import { Chat } from "#server/services/chat";
import { Database } from "#server/services/database";
import { Ids } from "#server/services/ids";
import { Site } from "#server/services/site";
import { System } from "#server/services/system";
import { Transactions } from "#server/services/transactions";
import { Users } from "#server/services/users";

export default () => System.tryCatch(main)();

async function main() {
  const cursor = Database.collection("blackjack-tickets").find(
    { processed: false },
    { sort: { timestamp: 1 } },
  );

  for await (const ticket of cursor) {
    System.tryCatch(processTicket)(ticket);
  }

  watch();
}

function watch() {
  const changeStream = Database.collection("blackjack-tickets").watch([
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

async function processTicket(ticket: BlackjackTicketDocument) {
  await Utility.wait(ticket.processDelay); // was going to compute

  const { matchedCount } = await Database.collection("blackjack-tickets").updateOne(
    {
      _id: ticket._id,
      processed: false,
    },
    {
      $set: {
        processed: true,
        processDate: new Date(),
      },
    },
  );

  if (matchedCount === 0) {
    return;
  }

  const users = await Database.collection("users")
    .find({
      _id: {
        $in: ticket.players.map((playerTicket) => playerTicket.userId),
      },
    })
    .toArray();

  for (const playerTicket of ticket.players) {
    const user = users.find((user) => user._id === playerTicket.userId);
    if (!user) throw new Error("User lookup failed.");

    const { betAmounts, mainPayout } = playerTicket;
    const mainBet = betAmounts["main-bet"];

    if (mainPayout) {
      // sanity
      if (!mainBet) throw new Error("payout without bet");

      await submit({
        gameId: ticket.gameId,
        user,
        betAmount: mainBet,
        payoutAmount: mainPayout,
        transaction: {
          kind: "blackjack-won",
          // ...mainPayoutDetails,
        },
      });
    }
    const { newSidebetPayouts } = playerTicket;

    for (const sideBet of newSidebetPayouts) {
      const { amount, type, title, multiplier } = sideBet;
      if (!amount) continue;

      const betAmount = type == "insurance" ? getInsuranceBetAmount(mainBet) : betAmounts[type];

      // sanity
      if (!betAmount) throw new Error("payout without bet");

      await submit({
        gameId: ticket.gameId,
        user,
        betAmount,
        payoutAmount: amount,
        transaction: {
          kind: "blackjack-sidebet-won",
          subKind: type,
          title,
          multiplier,
        },
      });
    }
  }

  const allFeedAr: BlackjackEventDocument[] = [];
  ticket.players.forEach(({ feedAr }) => {
    if (!feedAr) return;

    const modFeedAr = feedAr.map((feed) => {
      const user = users.find((user) => user._id === feed.userId);
      if (!user) throw new Error("User lookup failed for feed item");
      return {
        ...feed,
        _id: Ids.object(),
        timestamp: new Date(),
        user: Users.getBasicUser(users[0]),
      };
    });
    allFeedAr.push(...modFeedAr);
  });

  if (allFeedAr.length) await Database.collection("blackjack-events").insertMany(allFeedAr);
}

async function submit({
  gameId,
  user,
  betAmount,
  payoutAmount,
  transaction,
}: {
  gameId: string;
  user: UserDocument;
  betAmount: number;
  payoutAmount: number;
  transaction:
    | {
        kind: "blackjack-sidebet-won";

        subKind: BlackjackSidebetWonData["subKind"];
        title: BlackjackSidebetWonData["title"];
        multiplier: BlackjackSidebetWonData["multiplier"];
      }
    | {
        kind: "blackjack-won";
      };
}) {
  await Site.trackBet({
    game: "blackjack",
    user: Users.getBasicUser(user),
    betAmount,
    won: true, // vague
    wonAmount: payoutAmount,
  });

  await Transactions.createTransaction({
    user,
    autoComplete: true,
    amount: payoutAmount,
    gameId,
    ...transaction,
  });

  if (transaction.kind == "blackjack-sidebet-won") {
    await Site.trackActivity({
      kind: "blackjack-sidebet-win",
      subKind: transaction.subKind,
      user: Users.getBasicUser(user),
      amount: payoutAmount,
    });
  } else if (transaction.kind == "blackjack-won") {
    await Site.trackActivity({
      kind: "blackjack-win",
      user: Users.getBasicUser(user),
      amount: payoutAmount,
    });
  }

  const multiplier = payoutAmount / betAmount;

  if (multiplier >= 2 && payoutAmount >= Intimal.fromDecimal(1000)) {
    await Chat.createMessage({
      agent: "system",
      channel: null,
      kind: "blackjack-win",
      user: Users.getBasicUser(user),
      betKind: transaction.kind === "blackjack-won" ? "main-bet" : transaction.subKind,
      wonAmount: payoutAmount,
    });
  }
}
