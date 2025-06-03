// import { beforeAll, expect, describe, afterAll, it } from "vitest";
// import * as Managers from "../managers";
// import { Database } from "@server/services/database";
// import { Ids } from "@server/services/ids";
// import {
//   buildTestItems,
//   createTestChest,
//   createTestChestGame,
//   createTestChestItem,
//   createTestUser,
// } from "./testUtility";
// import { Intimal } from "@core/services/intimal";
// import { Chests } from "@core/services/chests";
// import { ChestDocument } from "@core/types/chests/ChestDocument";
// import { TransactionDocument } from "@core/types/transactions/TransactionDocument";
// import { Strings } from "@core/services/strings";

// describe("Chest Game Manager Test", () => {
//   beforeAll(async () => {
//     if (await Database.hasCollection("chests")) {
//       Database.collection("chests").drop();
//     }

//     if (await Database.hasCollection("chest-games")) {
//       Database.collection("chest-games").drop();
//     }

//     if (await Database.hasCollection("site-bets")) {
//       Database.collection("site-bets").drop();
//     }

//     if (await Database.hasCollection("site-activity")) {
//       Database.collection("site-activity").drop();
//     }

//     // Initialize Server DB
//     await Database.createCollection("users", {});
//     await Database.createCollection("chests", {});
//     await Database.createCollection("items", {});
//     await Database.createCollection("chest-games", {});
//     await Database.createCollection("chest-drops", {});
//     await Database.createCollection("site-bets", {});
//     await Database.createCollection("site-activity", {});
//     await Database.createCollection("chat-messages", {});
//     await Database.createCollection("transactions", {});

//     const itemId = Ids.long();
//     const chestItem = createTestChestItem({
//       id: itemId,
//       symbol: null,
//       slug: Strings.toSlug("test-market-hash"),
//       subType: "Sticker",
//       edition: "Standard",
//       wear: "Minimal Wear",
//       baseName: "test-sticker",
//       styleName: "Sticker",
//       dropRate: 100,
//       // announce: false,
//       jackpot: false,
//       special: false,
//       lootValue: 10,
//       lootCount: 0,
//     });
//     await Database.collection("items").insertOne({
//       _id: itemId,
//       marketHashName: "test-market-hash",
//       slug: Strings.toSlug("test-market-hash"),
//       type: "other",
//       subType: "Sticker",
//       edition: "Standard",
//       wear: "Minimal Wear",
//       baseName: "test-sticker",
//       styleName: "Sticker",
//       symbol: null,
//       loot: {
//         tokenValue: 1000,
//         rarity: "Common",
//         count: 1,
//       },
//     });

//     const test_user = createTestUser();
//     await Database.collection("users").insertOne(test_user);

//     Managers.chestGames();
//   }, 20000);

//   it("proper collections exists", async () => {
//     expect(await Database.hasCollection("chests")).toBeTruthy();
//     expect(await Database.hasCollection("users")).toBeTruthy();
//     expect(await Database.hasCollection("items")).toBeTruthy();
//     expect(await Database.hasCollection("chest-games")).toBeTruthy();
//     expect(await Database.hasCollection("site-bets")).toBeTruthy();
//     expect(await Database.hasCollection("site-activity")).toBeTruthy();
//     expect(await Database.hasCollection("chat-messages")).toBeTruthy();
//     expect(await Database.hasCollection("transactions")).toBeTruthy();
//   });

//   it("valid chest games case drop (won)", async () => {
//     const item = await Database.collection("items").findOne();

//     if (!item) return;
//     const items = await buildTestItems([
//       {
//         id: item._id,
//         dropRate: 100,
//         announce: true,
//         jackpot: false,
//         special: false,
//       },
//     ]);

//     const imageId = Ids.object();
//     const chestId = Ids.short();
//     const openCost = Intimal.ceil(Chests.getValue(items).openCost);

//     const chest: ChestDocument = createTestChest({
//       _id: chestId,
//       kind: "case",
//       slug: Strings.toSlug("test-case"),
//       imageId,
//       displayName: "test-case",
//       items,
//       openCost,
//       createDate: new Date(),
//       editDate: new Date(),
//       disabled: true,
//     });

//     await Database.collection("chests").insertOne(chest);
//     const user = await Database.collection("users").findOne();

//     if (!user) return;

//     const game = await createTestChestGame(user, chest);

//     await Database.collection("chest-games").insertOne(game);

//     await new Promise((resolve) => setTimeout(resolve, 1750));

//     const processedGame = await Database.collection("chest-games").findOne({
//       _id: game._id,
//     });

//     expect(processedGame?.processed).toBe(true);
//     expect(processedGame?.processDate).not.toBeNull();

//     const transactions = await Database.collection("transactions")
//       .find({
//         kind: "case-item-won",
//         gameId: game._id,
//       })
//       .toArray();

//     const processedTransaction: any = transactions[0];

//     expect(processedTransaction).not.toBeNull();
//     expect(processedTransaction.kind).toBe("case-item-won");
//     expect(processedTransaction.gameId).toBe(game._id);
//     expect(processedTransaction.chest.id).toBe(chest._id);
//     expect(processedTransaction.item.id).toBe(items[0].id);

//     const sitebets = await Database.collection("site-bets").find({ game: "cases" }).toArray();

//     const processedSiteBet = sitebets[0];
//     expect(processedSiteBet.user.id).toBe(user._id);

//     const siteActivity = await Database.collection("site-activity")
//       .find({ kind: "case-drop" })
//       .toArray();

//     const processedSiteActivity = siteActivity[0];
//     expect(processedSiteActivity.user.id).toBe(user._id);
//     expect(processedSiteActivity.kind).toBe("case-drop");

//     // If Game Announce is True
//     const chatMessage = await Database.collection("chat-messages")
//       .find({ kind: "case-game-win" })
//       .toArray();

//     const processedChatMessage: any = chatMessage[0];

//     expect(processedChatMessage.user.id).toBe(user._id);
//     expect(processedChatMessage.agent).toBe("system");
//     expect(processedChatMessage.kind).toBe("case-game-win");
//   });

//   // it("handle level case battle", async () => {
//   //   const item = await Database.collection("items").findOne();
//   //   if (!item) return;
//   //   const items = await buildTestItems([
//   //     {
//   //       id: item?._id,
//   //       dropRate: 100,
//   //       announce: true,
//   //       jackpot: false,
//   //       special: false,
//   //     },
//   //   ]);

//   //   const imageId = Ids.object();
//   //   const chestId = Ids.short();
//   //   const openCost = Intimal.ceil(Chests.getValue(items).openCost);

//   //   const chest: ChestDocument = createTestChest({
//   //     _id: chestId,
//   //     kind: "level-case",
//   //     slug: Strings.toSlug("test-case"),
//   //     imageId,
//   //     displayName: "test-level-case",
//   //     items,
//   //     openCost,
//   //     createDate: new Date(),
//   //     editDate: new Date(),
//   //     disabled: true,
//   //   });

//   //   await Database.collection("chests").insertOne(chest);
//   //   const user = await Database.collection("users").findOne();

//   //   if (!user) return;

//   //   const game = await createTestChestGame(user, chest);

//   //   await Database.collection("chest-games").insertOne(game);

//   //   await new Promise((resolve) => setTimeout(resolve, 1750));

//   //   const processedGame = await Database.collection("chest-games").findOne({
//   //     _id: game._id,
//   //   });

//   //   expect(processedGame?.processed).toBe(true);
//   //   expect(processedGame?.processDate).not.toBeNull();

//   //   const transactions = await Database.collection("transactions")
//   //     .find({
//   //       kind: "reward-level-case-item",
//   //       gameId: game._id,
//   //     })
//   //     .toArray();

//   //   const processedTransaction: any = transactions[0];

//   //   expect(processedTransaction).not.toBeNull();
//   //   expect(processedTransaction.kind).toBe("reward-level-case-item");
//   //   expect(processedTransaction.gameId).toBe(game._id);
//   //   expect(processedTransaction.chest.id).toBe(chest._id);
//   //   expect(processedTransaction.item.id).toBe(items[0].id);

//   //   const siteActivity = await Database.collection("site-activity")
//   //     .find({ kind: "reward-level-case-drop" })
//   //     .toArray();

//   //   const processedSiteActivity = siteActivity[0];
//   //   expect(processedSiteActivity.user.id).toBe(user._id);
//   //   expect(processedSiteActivity.kind).toBe("reward-level-case-drop");

//   //   // If Game Announce is True
//   //   const chatMessage = await Database.collection("chat-messages")
//   //     .find({ kind: "level-case-win" })
//   //     .toArray();

//   //   const processedChatMessage: any = chatMessage[0];

//   //   expect(processedChatMessage.user.id).toBe(user._id);
//   //   expect(processedChatMessage.agent).toBe("system");
//   //   expect(processedChatMessage.kind).toBe("level-case-win");
//   // });

//   it("handle gem case battle", async () => {
//     const item = await Database.collection("items").findOne();
//     if (!item) return;
//     const items = await buildTestItems([
//       {
//         id: item?._id,
//         dropRate: 100,
//         announce: true,
//         jackpot: false,
//         special: false,
//       },
//     ]);

//     const imageId = Ids.object();
//     const chestId = Ids.short();
//     const openCost = Intimal.ceil(Chests.getValue(items).openCost);

//     const chest: ChestDocument = createTestChest({
//       _id: chestId,
//       kind: "gem-case",
//       slug: Strings.toSlug("reward-test-gem-case"),
//       imageId,
//       displayName: "test-gem-case",
//       items,
//       openCost,
//       createDate: new Date(),
//       editDate: new Date(),
//       disabled: true,
//     });

//     await Database.collection("chests").insertOne(chest);

//     const user = await Database.collection("users").findOne();

//     if (!user) return;

//     const game = await createTestChestGame(user, chest);

//     await Database.collection("chest-games").insertOne(game);

//     await new Promise((resolve) => setTimeout(resolve, 1750));

//     const processedGame = await Database.collection("chest-games").findOne({
//       _id: game._id,
//     });

//     expect(processedGame?.processed).toBe(true);
//     expect(processedGame?.processDate).not.toBeNull();

//     const transactions = await Database.collection("transactions")
//       .find({
//         kind: "reward-gem-case-item",
//         gameId: game._id,
//       })
//       .toArray();

//     const processedTransaction: any = transactions[0];

//     expect(processedTransaction).not.toBeNull();
//     expect(processedTransaction.kind).toBe("reward-gem-case-item");
//     expect(processedTransaction.gameId).toBe(game._id);
//     expect(processedTransaction.chest.id).toBe(chest._id);
//     expect(processedTransaction.item.id).toBe(items[0].id);

//     const siteActivity = await Database.collection("site-activity")
//       .find({ kind: "reward-gem-case-drop" })
//       .toArray();

//     const processedSiteActivity = siteActivity[0];
//     expect(processedSiteActivity.user.id).toBe(user._id);
//     expect(processedSiteActivity.kind).toBe("reward-gem-case-drop");

//     // If Game Announce is True
//     const chatMessage = await Database.collection("chat-messages")
//       .find({ kind: "gem-case-win" })
//       .toArray();

//     const processedChatMessage: any = chatMessage[0];

//     expect(processedChatMessage.user.id).toBe(user._id);
//     expect(processedChatMessage.agent).toBe("system");
//     expect(processedChatMessage.kind).toBe("gem-case-win");
//   });

//   it("handle holiday case battle", async () => {
//     const item = await Database.collection("items").findOne();
//     if (!item) return;
//     const items = await buildTestItems([
//       {
//         id: item?._id,
//         dropRate: 100,
//         announce: true,
//         jackpot: false,
//         special: false,
//       },
//     ]);

//     const imageId = Ids.object();
//     const chestId = Ids.short();
//     const openCost = Intimal.ceil(Chests.getValue(items).openCost);

//     const chest: ChestDocument = createTestChest({
//       _id: chestId,
//       kind: "holiday-case",
//       slug: Strings.toSlug("holiday-test-case"),
//       imageId,
//       displayName: "test-holiday-case",
//       items,
//       openCost,
//       createDate: new Date(),
//       editDate: new Date(),
//       disabled: true,
//     });

//     await Database.collection("chests").insertOne(chest);

//     const user = await Database.collection("users").findOne();

//     if (!user) return;

//     const game = await createTestChestGame(user, chest);

//     await Database.collection("chest-games").insertOne(game);

//     await new Promise((resolve) => setTimeout(resolve, 1750));

//     const processedGame = await Database.collection("chest-games").findOne({
//       _id: game._id,
//     });

//     expect(processedGame?.processed).toBe(true);
//     expect(processedGame?.processDate).not.toBeNull();

//     const transactions = await Database.collection("transactions")
//       .find({
//         kind: "reward-holiday-case-item",
//         gameId: game._id,
//       })
//       .toArray();

//     const processedTransaction: any = transactions[0];

//     expect(processedTransaction).not.toBeNull();
//     expect(processedTransaction.kind).toBe("reward-holiday-case-item");
//     expect(processedTransaction.gameId).toBe(game._id);
//     expect(processedTransaction.chest.id).toBe(chest._id);
//     expect(processedTransaction.item.id).toBe(items[0].id);

//     const siteActivity = await Database.collection("site-activity")
//       .find({ kind: "reward-holiday-case-drop" })
//       .toArray();

//     const processedSiteActivity: any = siteActivity[0];
//     expect(processedSiteActivity.user.id).toBe(user._id);
//     expect(processedSiteActivity.kind).toBe("reward-holiday-case-drop");

//     // If Game Announce is True
//     const chatMessage = await Database.collection("chat-messages")
//       .find({ kind: "holiday-case-win" })
//       .toArray();

//     const processedChatMessage: any = chatMessage[0];

//     expect(processedChatMessage.user.id).toBe(user._id);
//     expect(processedChatMessage.agent).toBe("system");
//     expect(processedChatMessage.kind).toBe("holiday-case-win");
//   });
// });
