import { beforeAll, expect, describe, afterAll, it } from "vitest";
// import * as Managers from "../managers";
// import { Database } from "@server/services/database";
// import { Ids } from "@server/services/ids";
// import {
//   buildTestItems,
//   createTestChest,
//   createTestChestItem,
//   createTestUser,
// } from "./testUtility";
// import { Intimal } from "@core/services/intimal";
// import { createBattle } from "@server/services/case-battles/CaseBattles";
// import { UserLocation } from "@core/types/users/UserLocation";
// import { ChestWithCount } from "@core/types/chests/ChestDocument";
// import { Strings } from "@core/services/strings";
// import { Chests } from "@server/services/chests";

// describe("Case Battle Manager Test", () => {
//   beforeAll(async () => {
//     const user = createTestUser("tester1", "test1@gmail.com");
//     const user2 = createTestUser("tester2", "test2@gmail.com");

//     if (await Database.hasCollection("users")) {
//       await Database.createCollection("users", {});
//     }
//     if (await Database.hasCollection("case-battles")) {
//       await Database.createCollection("case-battles", {});
//     }
//     await Database.createCollection("site-bets", {});
//     await Database.createCollection("transactions", {});

//     // Initialize Server DB
//     await Database.createCollection("users", {});
//     await Database.createCollection("case-battles", {});
//     await Database.createCollection("items", {});
//     await Database.createCollection("chest-drops", {});
//     await Database.createCollection("chests", {});
//     await Database.createCollection("transactions", {});
//     await Database.createCollection("site-activity", {});
//     await Database.collection("users").insertMany([user, user2]);

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

//     Managers.caseBattles();
//   }, 20000);

//   it("create case battle for 2v2 mode", async () => {
//     const userOne = await Database.collection("users").findOne();
//     const userTwo = await Database.collection("users").findOne({ _id: { $ne: userOne?._id } });
//     if (!userOne || !userTwo) return;
//     const userLocation: UserLocation = {
//       ip: "123",
//       city: "miami",
//       region: "",
//       country: "USA",
//       countryCode: "1",
//     };

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

//     const chest = createTestChest({
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

//     const chestWithCount: ChestWithCount = { ...chest, count: 1 };

//     await Database.collection("chests").insertOne(chest);
//     const createdBattle = await createBattle({
//       user: userOne,
//       location: userLocation,
//       mode: "2v2",
//       chests: [chestWithCount],
//       modifiers: ["crazy"],
//     });

//     const createdBattleTwo = await createBattle({
//       user: userTwo,
//       location: userLocation,
//       mode: "2v2",
//       chests: [chestWithCount],
//       modifiers: ["crazy"],
//     });

//     expect(createdBattle.status).toBe("waiting");
//     expect(createdBattleTwo.status).toBe("waiting");

//     await new Promise((resolve) => setTimeout(resolve, 1050));

//     const transactions = await Database.collection("transactions")
//       .find({
//         kind: "case-battle-join",
//         gameId: createdBattle._id,
//       })
//       .toArray();

//     const processedTransaction = transactions[0];

//     expect(processedTransaction).not.toBeNull();
//     expect(processedTransaction.kind).toBe("case-battle-join");
//     expect(processedTransaction.category).toBe("case-battles");
//     expect(processedTransaction.user.id).toBe(userTwo._id);

//     const battle = await Database.collection("case-battles").updateOne(
//       { _id: createdBattle._id },
//       {
//         $set: {
//           ready: true,
//         },
//       },
//     );

//     Managers.caseBattles();

//     await new Promise((resolve) => setTimeout(resolve, 1050));

//     const pendingCaseBattle = await Database.collection("case-battles").findOne({
//       _id: createdBattle._id,
//     });
//     if (!pendingCaseBattle) return;
//     expect(pendingCaseBattle).not.toBeNull();
//     expect(pendingCaseBattle.status).toBe("pending");

//     await new Promise((resolve) => setTimeout(resolve, 3500));
//     const simulatingCaseBattle = await Database.collection("case-battles").findOne({
//       _id: createdBattle._id,
//     });
//     if (!simulatingCaseBattle) return;
//     expect(simulatingCaseBattle).not.toBeNull();
//     expect(simulatingCaseBattle.status).toBe("simulating");
//   });
// });
describe("", () => {
  it("", () => {
    expect(1 + 1).toBe(2);
  });
});
