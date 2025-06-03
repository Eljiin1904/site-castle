import { beforeAll, expect, describe, afterAll, it, vi, beforeEach } from "vitest";
import * as Managers from "../managers";
import { Database } from "@server/services/database";
import { Ids } from "@server/services/ids";
import { Random } from "@server/services/random";
import { createTestUser } from "./testUtility";
import { Users } from "@server/services/users";
import { CrashRoundDocument } from "@core/types/crash/CrashRoundDocument";
import { CrashTicketDocument } from "@core/types/crash/CrashTicketDocument";
import { Crash } from "@server/services/crash";

describe("Crash Manager Test", () => {
  beforeAll(async () => {
    const user = createTestUser();

    if (await Database.hasCollection("users")) {
      await Database.createCollection("users", {});
    }
    await Database.createCollection("site-bets", {});
    await Database.createCollection("transactions", {});
  }, 20000);

  beforeEach(async () => {
    if (await Database.hasCollection("crash-rounds")) {
      Database.collection("crash-rounds").drop();
    }
    await Database.createCollection("crash-rounds", {});

    if (await Database.hasCollection("crash-tickets")) {
      Database.collection("crash-tickets").drop();
    }
    await Database.createCollection("crash-tickets", {});

    if (await Database.hasCollection("site-activity")) {
      Database.collection("site-activity").drop();
    }

    await Database.createCollection("site-activity", {});
    await Database.createCollection("chat-messages", {});
  });

  it("create waiting and pending crash game", async () => {
    const roundId = await Ids.incremental({
      key: "crashRoundId",
      baseValue: 1000000,
      batchSize: 1,
    });

    const round: CrashRoundDocument = {
      _id: roundId,
      timestamp: new Date(),
      status: "waiting",
      statusDate: new Date(),
    };

    await Database.collection("crash-rounds").insertOne(round);
    await new Promise((resolve) => setTimeout(resolve, 350));
    Managers.crash();
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const crashRound = await Database.collection("crash-rounds").findOne({
      _id: roundId,
    });

    expect(crashRound).not.toBeNull();
    expect(crashRound?._id).toBe(roundId);
    expect(crashRound?.status).toBe("pending");
    expect(crashRound?.processed).toBeUndefined();
    expect(crashRound?.multiplier).toBeUndefined();
    expect(crashRound?.won).toBeUndefined();

  });

  // it("crash start round", async () => {
  //   Managers.crash();
  //   await new Promise((resolve) => setTimeout(resolve, 350));
  //   const crashRound = await Database.collection("crash-rounds").findOne();

  //   expect(crashRound).not.toBeNull();
  //   expect(crashRound?.status).toBe("waiting");
  //   expect(crashRound?.processed).toBeUndefined();
  //   expect(crashRound?.multiplier).toBeUndefined();
  //   expect(crashRound?.won).toBeUndefined();
  // });

  // it("crash complete round", async () => {
  //   const roundId = await Ids.incremental({
  //     key: "crasheRoundId",
  //     baseValue: 1000000,
  //     batchSize: 1,
  //   });

  //   const serverSeed = Ids.secret();
  //   const serverSeedHash = Random.hashServerSeed(serverSeed);
  //   const multiplier = 4;
  //   const blockNow = await Random.getEosBlockNow();
  //   const eosBlockNum = blockNow.eosBlockNum + 4;
  //   const statusDate = new Date();
  //   const { id: eosBlockId } = await Random.getEosBlock(eosBlockNum);

  //   const round: CrashRoundDocument = {
  //     _id: roundId,
  //     timestamp: new Date(),
  //     status: "simulating",
  //     statusDate: new Date(),
  //     multiplier: multiplier,
  //     eosBlockId,
  //     eosBlockNum,
  //     eosCommitDate: statusDate,
  //   };

  //   await Database.collection("crash-rounds").insertOne(round);
  //   await new Promise((resolve) => setTimeout(resolve, 500));

  //   const user = await Database.collection("users").findOne();

  //   if (!user) return;

  //   const ticketId = await Ids.incremental({
  //     key: "crashTicketId",
  //     baseValue: 1000000,
  //     batchSize: 100,
  //   });

  //   const notCashTicket: CrashTicketDocument = {
  //     _id: ticketId,
  //     timestamp: new Date(),
  //     roundId: roundId,
  //     user: Users.getBasicUser(user),
  //     betAmount: 100,
  //     targetMultiplier: 1
  //   };
  //   const cashTicket: CrashTicketDocument = {
  //     _id: ticketId,
  //     timestamp: new Date(),
  //     roundId: roundId,
  //     user: Users.getBasicUser(user),
  //     betAmount: 100,
  //     targetMultiplier: 4
  //   };

  //   await Database.collection("crash-tickets").insertOne(notCashTicket);
  //   await Database.collection("crash-tickets").insertOne(cashTicket);
  //   await new Promise((resolve) => setTimeout(resolve, 500));
  //   Managers.crash();
  //   await new Promise((resolve) => setTimeout(resolve, 500));
  //   const crashRound = await Database.collection("double-rounds").findOne({
  //     _id: roundId,
  //   });

  //   expect(crashRound).not.toBeNull();
  //   expect(crashRound?._id).toBe(roundId);
  //   expect(crashRound?.status).toBe("completed");
  //   expect(crashRound?.processed).toBeUndefined();

  //   const crashTickets = Database.collection("crash-tickets").find({
  //     roundId: crashRound?._id,
  //   }).toArray();
  //   if (!(await crashTickets).length) return;
  //   // expect(crashTickets).not.toBeNull();
  //   // expect(doubleTickets?.roundId).toBe(roundId);
  //   // expect(doubleTickets?.betAmount).toBe(100);
  //   // expect(doubleTickets?.betKind).toBe("red");
  //   // expect(doubleTickets?.processed).toBeTruthy();

  //   // const siteBets = await Database.collection("site-bets").findOne({
  //   //   game: "double",
  //   //   user: Users.getBasicUser(user),
  //   //   betAmount: 100,
  //   //   wonAmount: 200,
  //   // });

  //   // expect(siteBets).not.toBeNull();
  //   // expect(siteBets?.won).toBeTruthy();
  //   // expect(siteBets?.wonAmount).toBe(200);

  //   // const transaction = await Database.collection("transactions").findOne({
  //   //   gameId: ticketId,
  //   //   category: "double",
  //   //   kind: "double-won",
  //   // });

  //   // expect(transaction).not.toBeNull();
  //   // expect(transaction?.amount).toBe(200);
  // });
});
// import { describe, it, expect, vi } from "vitest";
// import { triggerAutoCashTickets } from "./crash";
// import { Database } from "@server/services/database";

// vi.mock("@server/services/database", () => ({
//   Database: {
//     collection: vi.fn(() => ({
//       updateMany: vi.fn(),
//     })),
//   },
// }));

// describe("triggerAutoCashTickets", () => {
//   const mockUpdateMany = vi.fn();

//   beforeEach(() => {
//     vi.clearAllMocks();
//     Database.collection = vi.fn(() => ({
//       updateMany: mockUpdateMany,
//     }));
//   });

//   it("should return early if multiplier is undefined", async () => {
//     await triggerAutoCashTickets("roundId");
//     expect(mockUpdateMany).not.toHaveBeenCalled();
//   });

//   it("should return early if multiplier is less than or equal to 1", async () => {
//     await triggerAutoCashTickets("roundId", 1);
//     expect(mockUpdateMany).not.toHaveBeenCalled();
//   });

//   it("should call updateMany with correct query and update pipeline when multiplier is valid", async () => {
//     const roundId = "roundId";
//     const multiplier = 2;

//     await triggerAutoCashTickets(roundId, multiplier);

//     expect(Database.collection).toHaveBeenCalledWith("crash-tickets");
//     expect(mockUpdateMany).toHaveBeenCalledWith(
//       {
//         roundId: roundId,
//         processed: { $exists: false },
//         multiplierCrashed: { $exists: false },
//         cashoutTriggered: { $exists: false },
//         targetMultiplier: { $gt: 1, $lte: multiplier },
//       },
//       [
//         {
//           $set: {
//             cashoutTriggered: true,
//             cashoutTriggeredDate: expect.any(Date),
//             multiplierCrashed: "$targetMultiplier",
//             autoCashedTriggerd: true,
//           },
//         },
//       ]
//     );
//   });
// });