import { Intimal } from "@core/services/intimal";
import { Utility } from "@core/services/utility";
import { Site } from "@server/services/site";
import { Chat } from "@server/services/chat";
import { Database } from "@server/services/database";
import { System } from "@server/services/system";
import { Transactions } from "@server/services/transactions";
import { Users } from "@server/services/users";
import { Mines } from "@server/services/mines";
import { HandledError } from "@server/services/errors";
import { Ids } from "@server/services/ids";

export default () => System.tryCatch(main)();

async function main() {
  const cursor = Database.collection("mines-games").find(
    { completed: true, processed: { $exists: false } },
    { sort: { timestamp: 1 } },
  );

  for await (const ticket of cursor) {
    System.tryCatch(processGame)(ticket._id);
  }

  watch();
}

function watch() {
  const changeStream = Database.collection("mines-games").watch([
    {
      $match: {
        operationType: "update",
        "updateDescription.updatedFields.completed": true,
      },
    },
  ]);

  changeStream.on("change", (e) => {
    if (e.operationType === "update") {
      System.tryCatch(processGame)(e.documentKey._id);
    }
  });

  changeStream.on("error", (err) => {
    System.handleError(err);
    changeStream.removeAllListeners();
    watch();
  });
}

async function processGame(documentId: string) {
  let game = await Database.collection("mines-games").findOneAndUpdate(
    {
      _id: documentId,
      completed: true,
      processed: { $exists: false },
    },
    {
      $set: {
        processed: true,
        processedDate: new Date(),
      },
    },
    { returnDocument: "after" },
  );

  if (!game) {
    return;
  }

  if (game.betAmount === 0) {
    return;
  }

  // FRONT-END ANIMATION DELAY
  const { mines, reveals } = game;
  let sequence = reveals;

  for (const [index, reveal] of reveals.entries()) {
    if (mines.includes(reveal)) {
      sequence = reveals.slice(0, index + 1);
      break; // to ensure we stop at the first mine
    }
  }

  const now = Date.now();
  const then = game.lastRevealDate?.valueOf() || now;
  const elapsedTime = now - then;

  const modalWillAppear = sequence.length === reveals.length;
  const winModalWaitTime = modalWillAppear ? 200 : 0;
  // ^ See MinesWinCard.scss for this, 100ms animation + 100ms is known
  // to be the declared animation timing in the scss file, not worth
  // parameterizing this just to have to pass it to the stylesheet as a
  // variable from the tsx

  const animationTime = Mines.animationDuration * sequence.length;

  const waitTime = animationTime + winModalWaitTime - elapsedTime;
  await Utility.wait(waitTime);
  // END FRONT-END ANIMATION DELAY

  const user = await Database.collection("users").findOne({
    _id: game.user.id,
  });

  if (!user) {
    throw new Error("User lookup failed.");
  }

  const won = Mines.isAlive(game);
  const multiplier = Mines.getMultiplier(game);

  let wonAmount;
  if (!won) {
    wonAmount = 0;
  } else {
    wonAmount = Math.min(Mines.maxProfit + game.betAmount, Math.round(game.betAmount * multiplier));
  }

  const updatedGame = await Database.collection("mines-games").findOneAndUpdate(
    {
      _id: game._id,
    },
    {
      $set: {
        won,
        wonAmount,
        multiplier,
      },
    },
    {
      returnDocument: "after",
    },
  );

  if (!updatedGame) {
    throw new HandledError("Game lookup failed.");
  }

  game = updatedGame;

  if (won) {
    await Transactions.createTransaction({
      user,
      autoComplete: true,
      kind: "mines-won",
      amount: wonAmount,
      gameId: game._id,
      multiplier,
      gridSize: game.gridSize,
      mineCount: game.mineCount,
      revealCount: game.revealCount,
    });

    await Site.trackActivity({
      kind: "mines-win",
      user: Users.getBasicUser(user),
      amount: wonAmount,
    });
  }

  if (won && multiplier >= 2 && wonAmount >= Intimal.fromDecimal(500)) {
    await Chat.createMessage({
      agent: "system",
      channel: null,
      kind: "mines-win",
      user: Users.getBasicUser(user),
      multiplier,
      wonAmount,
    });
  }

  await Site.trackBet({
    game: "mines",
    user: Users.getBasicUser(user),
    betAmount: game.betAmount,
    won,
    wonAmount,
  });

  await Database.collection("mines-events").insertOne({
    _id: Ids.object(),
    gameId: game._id,
    user: game.user,
    gridSize: game.gridSize,
    mineCount: game.mineCount,
    revealCount: game.revealCount,
    won,
    wonAmount,
    multiplier,
  });
}
