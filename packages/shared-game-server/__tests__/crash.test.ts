import { beforeAll, expect, describe, afterAll, it, vi, beforeEach } from "vitest";
import * as Managers from "./../src/managers";
import { Database } from "@server/services/database";
import { Ids } from "@server/services/ids";
import { Users } from "@server/services/users";
import { CrashRoundDocument } from "@core/types/crash/CrashRoundDocument";
import { CrashTicketDocument } from "@core/types/crash/CrashTicketDocument";
import { Crash as CoreCrash } from "@core/services/crash";
import { CrashMultiplierDocument } from "@core/types/crash/CrashMultiplierDocument";

describe("Crash Manager Test", () => {
  beforeAll(async () => {
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

    if (await Database.hasCollection("crash-next-tickets")) {
      Database.collection("crash-next-tickets").drop();
    }
    await Database.createCollection("crash-next-tickets", {});

    if (await Database.hasCollection("crash-multipliers")) {
      Database.collection("crash-multipliers").drop();
    }
    await Database.createCollection("crash-multipliers", {});

    if (await Database.hasCollection("site-activity")) {
      Database.collection("site-activity").drop();
    }

    await Database.createCollection("site-activity", {});
    await Database.createCollection("chat-messages", {});
  });

  it("create waiting crash game", async () => {
    Managers.crash();
    await new Promise((resolve) => setTimeout(resolve, 100));
    const crashRound = await Database.collection("crash-rounds").findOne();

    expect(crashRound).not.toBeNull();
    expect(crashRound?.status).toBe("waiting");
    expect(crashRound?.processed).toBeUndefined();
    expect(crashRound?.multiplier).toBeUndefined();
    expect(crashRound?.won).toBeUndefined();
  });

  it("create crash game and move next round tickets to active round", async () => {
    const nextRoundTicketId = await Ids.incremental({
      key: "crashNextTicketId",
      baseValue: 1000000,
      batchSize: 100,
    });

    const user = await Database.collection("users").findOne();
    if (!user) return;

    const nextRoundTicket: CrashTicketDocument = {
      _id: nextRoundTicketId,
      timestamp: new Date(),
      roundId: "next",
      user: Users.getBasicUser(user),
      betAmount: 100,
      targetMultiplier: 1,
    };

    await Database.collection("crash-next-tickets").insertOne(nextRoundTicket);
    Managers.crash();
    await new Promise((resolve) => setTimeout(resolve, 5000));
    const crashRound = await Database.collection("crash-rounds").findOne();
    const nextRoundTickets = await Database.collection("crash-next-tickets").countDocuments({
      roundId: "next",
    });
    const roundTickets = await Database.collection("crash-tickets").countDocuments({
      roundId: crashRound?._id,
    });
    expect(crashRound).not.toBeNull();
    expect(crashRound?.status).toBe("pending");
    expect(crashRound?.processed).toBeUndefined();
    expect(crashRound?.multiplier).toBeUndefined();
    expect(crashRound?.won).toBeUndefined();
    expect(nextRoundTickets).toBe(0);
    expect(roundTickets).toBe(1);
  });

  it("start crash round", async () => {
    Managers.crash();
    await new Promise((resolve) => setTimeout(resolve, 5700));
    const crashRound = await Database.collection("crash-rounds").findOne();
    expect(crashRound).not.toBeNull();
    expect(crashRound?.status).toBe("simulating");
    expect(crashRound?.processed).toBeUndefined();
    expect(crashRound?.multiplier).toBeUndefined();
    expect(crashRound?.won).toBeUndefined();
    const multiplierRound = await Database.collection("crash-multipliers").findOne({
      roundId: crashRound?._id,
    });
    expect(multiplierRound).not.toBeNull();
    expect(multiplierRound?.roundId).toBe(crashRound?._id);
    expect(multiplierRound?.multiplier).toBeGreaterThan(1);
    expect(multiplierRound?.timestamp).toBeDefined();
    expect(multiplierRound?.roundTime).toBe(
      CoreCrash.getTimeForMultiplier(multiplierRound?.multiplier ?? 1),
    );
  });

  it("complete crash round and ticket won", async () => {
    const user = await Database.collection("users").findOne();
    if (!user) return;
    const roundId = await Ids.incremental({
      key: "crashRoundId",
      baseValue: 1000000,
      batchSize: 1,
    });
    const multiplierId = await Ids.incremental({
      key: "crashMultiplierId",
      baseValue: 1000000,
      batchSize: 1,
    });
    const cashoutTicketId = await Ids.incremental({
      key: "crashTicketId",
      baseValue: 1000000,
      batchSize: 100,
    });

    const serverHash = Ids.secret();
    const multiplier = 2;
    const multiplierTime = CoreCrash.getTimeForMultiplier(multiplier);

    const crashRound: CrashRoundDocument = {
      _id: roundId,
      timestamp: new Date(),
      status: "simulating",
      statusDate: new Date(),
      startDate: new Date(),
      multiplier: multiplier,
    };
    const crashMultiplier: CrashMultiplierDocument = {
      _id: multiplierId,
      roundId: roundId,
      multiplier: multiplier,
      timestamp: new Date(),
      roundTime: multiplierTime,
      serverHash,
      clientHash: Ids.secret(),
    };
    const crashTicket: CrashTicketDocument = {
      _id: cashoutTicketId,
      timestamp: new Date(),
      roundId: roundId,
      user: Users.getBasicUser(user),
      betAmount: 100,
      targetMultiplier: multiplier,
    };
    await Database.collection("crash-rounds").insertOne(crashRound);
    await Database.collection("crash-multipliers").insertOne(crashMultiplier);
    await Database.collection("crash-tickets").insertOne(crashTicket);
    await new Promise((resolve) => setTimeout(resolve, 500));
    Managers.crash();

    await new Promise((resolve) => setTimeout(resolve, multiplierTime + 5000));
    const completedCrashRound = await Database.collection("crash-rounds").findOne({
      _id: roundId,
    });

    expect(completedCrashRound).not.toBeNull();
    expect(completedCrashRound?._id).toBe(roundId);
    expect(completedCrashRound?.status).toBe("completed");
    expect(completedCrashRound?.processed).toBe(true);
    expect(completedCrashRound?.multiplier).toBe(multiplier);
    expect(completedCrashRound?.won).toBe(true);

    const crashTickets = await Database.collection("crash-tickets")
      .find({
        roundId: completedCrashRound?._id,
      })
      .toArray();
    expect(crashTickets).not.toBeNull();
    expect(crashTickets.length).toBe(1);
    expect(crashTickets[0]._id).toBe(cashoutTicketId);
    expect(crashTickets[0].roundId).toBe(roundId);
    expect(crashTickets[0].betAmount).toBe(100);
    expect(crashTickets[0].targetMultiplier).toBe(multiplier);
    expect(crashTickets[0].processed).toBeTruthy();
    expect(crashTickets[0].won).toBeTruthy();
    expect(crashTickets[0].cashoutTriggered).toBeTruthy();
    expect(crashTickets[0].cashoutTriggeredDate).toBeDefined();
    expect(crashTickets[0].multiplierCrashed).toBe(multiplier);
    expect(crashTickets[0].autoCashedTriggered).toBeTruthy();
    expect(crashTickets[0].cashoutTriggeredDate).toBeDefined();

    const siteBets = await Database.collection("site-bets").findOne({
      game: "crash",
      user: Users.getBasicUser(user),
      betAmount: 100,
      wonAmount: 200,
    });
    expect(siteBets).not.toBeNull();
    expect(siteBets?.won).toBeTruthy();
    expect(siteBets?.wonAmount).toBe(200);
  }, 20000);

  it("complete crash round and ticket lost", async () => {
    const user = await Database.collection("users").findOne();
    if (!user) return;
    const roundId = await Ids.incremental({
      key: "crashRoundId",
      baseValue: 1000000,
      batchSize: 1,
    });
    const multiplierId = await Ids.incremental({
      key: "crashMultiplierId",
      baseValue: 1000000,
      batchSize: 1,
    });
    const cashoutTicketId = await Ids.incremental({
      key: "crashTicketId",
      baseValue: 1000000,
      batchSize: 100,
    });
    const serverHash = Ids.secret();
    const multiplier = 2;
    const multiplierTime = CoreCrash.getTimeForMultiplier(multiplier);
    const crashRound: CrashRoundDocument = {
      _id: roundId,
      timestamp: new Date(),
      status: "simulating",
      statusDate: new Date(),
      startDate: new Date(),
      multiplier: multiplier,
    };
    const crashMultiplier: CrashMultiplierDocument = {
      _id: multiplierId,
      roundId: roundId,
      multiplier: multiplier,
      timestamp: new Date(),
      roundTime: multiplierTime,
      serverHash,
      clientHash: Ids.secret(),
    };
    const crashTicket: CrashTicketDocument = {
      _id: cashoutTicketId,
      timestamp: new Date(),
      roundId: roundId,
      user: Users.getBasicUser(user),
      betAmount: 100,
      targetMultiplier: multiplier + 0.01, // Set target multiplier higher than actual multiplier to simulate loss
    };
    await Database.collection("crash-rounds").insertOne(crashRound);
    await Database.collection("crash-multipliers").insertOne(crashMultiplier);
    await Database.collection("crash-tickets").insertOne(crashTicket);
    await new Promise((resolve) => setTimeout(resolve, 500));
    Managers.crash();
    await new Promise((resolve) => setTimeout(resolve, multiplierTime + 5000));
    const completedCrashRound = await Database.collection("crash-rounds").findOne({
      _id: roundId,
    });
    expect(completedCrashRound).not.toBeNull();
    expect(completedCrashRound?._id).toBe(roundId);
    expect(completedCrashRound?.status).toBe("completed");
    expect(completedCrashRound?.processed).toBe(true);
    expect(completedCrashRound?.multiplier).toBe(multiplier);
    expect(completedCrashRound?.won).toBe(false);
    const crashTickets = await Database.collection("crash-tickets")
      .find({
        roundId: completedCrashRound?._id,
      })
      .toArray();
    expect(crashTickets).not.toBeNull();
    expect(crashTickets.length).toBe(1);
    expect(crashTickets[0]._id).toBe(cashoutTicketId);
    expect(crashTickets[0].roundId).toBe(roundId);
    expect(crashTickets[0].betAmount).toBe(100);
    expect(crashTickets[0].targetMultiplier).toBe(multiplier + 0.01);
    expect(crashTickets[0].processed).toBeTruthy();
    expect(crashTickets[0].won).toBeFalsy();
    expect(crashTickets[0].cashoutTriggered).not.toBeDefined();
    expect(crashTickets[0].cashoutTriggeredDate).not.toBeDefined();
    expect(crashTickets[0].multiplierCrashed).not.toBeDefined();
    expect(crashTickets[0].autoCashedTriggered).not.toBeDefined();
    const siteBets = await Database.collection("site-bets").findOne({
      game: "crash",
      user: Users.getBasicUser(user),
      betAmount: 100,
      wonAmount: 0,
    });
    expect(siteBets).not.toBeNull();
    expect(siteBets?.won).toBeFalsy();
    expect(siteBets?.wonAmount).toBe(0);
  }, 20000);
});
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
