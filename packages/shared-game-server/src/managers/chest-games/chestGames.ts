import { Utility } from "@core/services/utility";
import { ChestGameDocument } from "@core/types/chests/ChestGameDocument";
import { UserDocument } from "@core/types/users/UserDocument";
import { Site } from "@server/services/site";
import { Chat } from "@server/services/chat";
import { Chests } from "@server/services/chests";
import { Database } from "@server/services/database";
import { System } from "@server/services/system";
import { Transactions } from "@server/services/transactions";
import { Users } from "@server/services/users";

export default () => System.tryCatch(main)();

async function main() {
  const cursor = Database.collection("chest-games").find(
    { processed: { $exists: false } },
    { sort: { timestamp: 1 } },
  );

  for await (const game of cursor) {
    System.tryCatch(processGame)(game);
  }

  watch();
}

function watch() {
  const changeStream = Database.collection("chest-games").watch([
    { $match: { operationType: "insert" } },
  ]);

  changeStream.on("change", (e) => {
    if (e.operationType === "insert" && e.fullDocument) {
      System.tryCatch(processGame)(e.fullDocument);
    }
  });

  changeStream.on("error", (err) => {
    console.error(err.message);
    changeStream.removeAllListeners();
    watch();
  });
}

async function processGame(game: ChestGameDocument) {
  await Utility.wait(Chests.getSpinDuration(game.speed));
  await Utility.wait(Chests.alignTime);

  if (game.roll.specialSpin) {
    await Utility.wait(Chests.resultTime);
    await Utility.wait(Chests.getSpinDuration(game.speed));
    await Utility.wait(Chests.alignTime);
  }

  const user = await Database.collection("users").findOne({
    _id: game.user.id,
  });

  if (!user) {
    throw new Error("User lookup failed.");
  }

  await Database.collection("chest-games").updateOne(
    { _id: game._id },
    { $set: { processed: true, processDate: new Date() } },
  );

  if (game.chest.kind === "case") {
    await processCaseGame({ game, user });
  } else if (game.chest.kind === "level-case") {
    await processLevelCase({ game, user });
  } else if (game.chest.kind === "gem-case") {
    await processGemCase({ game, user });
  } else if (game.chest.kind === "holiday-case") {
    await processHolidayCase({ game, user });
  }

  await Chests.createDrop({
    source: "game",
    user: Users.getBasicUser(user),
    chest: game.chest,
    loot: game.loot,
  });
}

async function processCaseGame({ game, user }: { game: ChestGameDocument; user: UserDocument }) {
  await Transactions.createTransaction({
    user,
    autoComplete: true,
    kind: "case-item-won",
    amount: game.loot.lootValue,
    gameId: game._id,
    chest: game.chest,
    item: game.loot,
  });

  await Site.trackBet({
    game: "cases",
    user: Users.getBasicUser(user),
    betAmount: game.chest.openCost,
    won: true,
    wonAmount: game.loot.lootValue,
  });

  await Site.trackActivity({
    kind: "case-drop",
    user: Users.getBasicUser(user),
    amount: game.loot.lootValue,
    chest: game.chest,
    loot: game.loot,
  });

  if (game.loot.announce) {
    await Chat.createMessage({
      agent: "system",
      channel: null,
      kind: "case-game-win",
      user: Users.getBasicUser(user),
      chest: game.chest,
      item: game.loot,
    });
  }
}

async function processLevelCase({ game, user }: { game: ChestGameDocument; user: UserDocument }) {
  await Transactions.createTransaction({
    user,
    autoComplete: true,
    kind: "reward-level-case-item",
    amount: game.loot.lootValue,
    gameId: game._id,
    chest: game.chest,
    item: game.loot,
  });

  await Site.trackActivity({
    kind: "reward-level-case-drop",
    user: Users.getBasicUser(user),
    amount: game.loot.lootValue,
    chest: game.chest,
    loot: game.loot,
  });

  if (game.loot.announce) {
    await Chat.createMessage({
      agent: "system",
      channel: null,
      kind: "level-case-win",
      user: Users.getBasicUser(user),
      chest: game.chest,
      item: game.loot,
    });
  }
}

async function processGemCase({ game, user }: { game: ChestGameDocument; user: UserDocument }) {
  await Transactions.createTransaction({
    user,
    autoComplete: true,
    kind: "reward-gem-case-item",
    amount: game.loot.lootValue,
    gameId: game._id,
    chest: game.chest,
    item: game.loot,
  });

  await Site.trackActivity({
    kind: "reward-gem-case-drop",
    user: Users.getBasicUser(user),
    amount: game.loot.lootValue,
    chest: game.chest,
    loot: game.loot,
  });

  if (game.loot.announce) {
    await Chat.createMessage({
      agent: "system",
      channel: null,
      kind: "gem-case-win",
      user: Users.getBasicUser(user),
      chest: game.chest,
      item: game.loot,
    });
  }
}

async function processHolidayCase({ game, user }: { game: ChestGameDocument; user: UserDocument }) {
  await Transactions.createTransaction({
    user,
    autoComplete: true,
    kind: "reward-holiday-case-item",
    amount: game.loot.lootValue,
    gameId: game._id,
    chest: game.chest,
    item: game.loot,
  });

  await Site.trackActivity({
    kind: "reward-holiday-case-drop",
    user: Users.getBasicUser(user),
    amount: game.loot.lootValue,
    chest: game.chest,
    loot: game.loot,
  });

  if (game.loot.announce) {
    await Chat.createMessage({
      agent: "system",
      channel: null,
      kind: "holiday-case-win",
      user: Users.getBasicUser(user),
      chest: game.chest,
      item: game.loot,
    });
  }
}
