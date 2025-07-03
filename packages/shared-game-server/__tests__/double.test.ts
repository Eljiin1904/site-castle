import { beforeAll, expect, describe, afterAll, it, vi, beforeEach } from "vitest";
import * as Managers from "../src/managers";
import { Database } from "@server/services/database";
import { Ids } from "@server/services/ids";
import { Random } from "@server/services/random";
import { createTestUser, resetDatabaseConnections } from "./testUtility";
import { Users } from "@server/services/users";
import { DoubleRoundDocument } from "@core/types/double/DoubleRoundDocument";
import { DoubleTicketDocument } from "@core/types/double/DoubleTicketDocument";

describe("Double Manager Test", () => {
  beforeAll(async () => {
    const user = createTestUser();
    await Promise.allSettled([
      Database.collection("users").deleteOne({
        _id: user._id,
      }),
      resetDatabaseConnections(["site-bets", "transactions"]),
    ]);
  }, 20000);

  beforeEach(async () => {
    await resetDatabaseConnections([
      "double-rounds",
      "double-tickets",
      "site-activity",
      "chat-messages",
    ]);
  });

  it("create waiting double game", async () => {
    const roundId = await Ids.incremental({
      key: "doubleRoundId",
      baseValue: 1000000,
      batchSize: 1,
    });

    const serverSeed = Ids.secret();
    const serverSeedHash = Random.hashServerSeed(serverSeed);

    const round: DoubleRoundDocument = {
      _id: roundId,
      timestamp: new Date(),
      serverSeed,
      serverSeedHash,
      status: "waiting",
      statusDate: new Date(),
    };

    await Database.collection("double-rounds").insertOne(round);
    await new Promise((resolve) => setTimeout(resolve, 500));
    Managers.double();
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const doubleRound = await Database.collection("double-rounds").findOne({
      _id: roundId,
    });

    expect(doubleRound).not.toBeNull();
    expect(doubleRound?._id).toBe(roundId);
    expect(doubleRound?.status).toBe("pending");
    expect(doubleRound?.processed).toBeUndefined();
  });

  it("double start round", async () => {
    Managers.double();
    await new Promise((resolve) => setTimeout(resolve, 350));
    const doubleRound = await Database.collection("double-rounds").findOne();

    expect(doubleRound).not.toBeNull();
    expect(doubleRound?.status).toBe("waiting");
    expect(doubleRound?.processed).toBeUndefined();
  });

  it("double complete round", async () => {
    const roundId = await Ids.incremental({
      key: "doubleRoundId",
      baseValue: 1000000,
      batchSize: 1,
    });

    const serverSeed = Ids.secret();
    const serverSeedHash = Random.hashServerSeed(serverSeed);
    const roll = {
      value: 5,
      color: "red",
      bait: false,
      offset: 1,
    };
    const blockNow = await Random.getEosBlockNow();
    const eosBlockNum = blockNow.eosBlockNum + 4;
    const statusDate = new Date();
    const { eosBlockId } = await Random.getEosBlock(eosBlockNum);

    const round: DoubleRoundDocument = {
      _id: roundId,
      timestamp: new Date(),
      serverSeed,
      serverSeedHash,
      status: "simulating",
      statusDate: new Date(),
      roll: {
        value: 2,
        color: "red",
        bait: false,
        offset: 1,
      },
      eosBlockId,
      eosBlockNum,
      eosCommitDate: statusDate,
    };

    await Database.collection("double-rounds").insertOne(round);
    await new Promise((resolve) => setTimeout(resolve, 500));

    const user = await Database.collection("users").findOne();

    if (!user) return;

    const ticketId = await Ids.incremental({
      key: "doubleTicketId",
      baseValue: 1000000,
      batchSize: 100,
    });

    const ticket: DoubleTicketDocument = {
      _id: ticketId,
      timestamp: new Date(),
      roundId: roundId,
      user: Users.getBasicUser(user),
      betAmount: 100,
      betKind: "red",
    };

    await Database.collection("double-tickets").insertOne(ticket);
    await new Promise((resolve) => setTimeout(resolve, 500));
    Managers.double();
    await new Promise((resolve) => setTimeout(resolve, 500));
    const doubleRound = await Database.collection("double-rounds").findOne({
      _id: roundId,
    });

    expect(doubleRound).not.toBeNull();
    expect(doubleRound?._id).toBe(roundId);
    expect(doubleRound?.status).toBe("completed");
    expect(doubleRound?.processed).toBeUndefined();

    const doubleTickets = await Database.collection("double-tickets").findOne({
      roundId: doubleRound?._id,
    });
    if (!doubleTickets) return;
    expect(doubleTickets).not.toBeNull();
    expect(doubleTickets?.roundId).toBe(roundId);
    expect(doubleTickets?.betAmount).toBe(100);
    expect(doubleTickets?.betKind).toBe("red");
    expect(doubleTickets?.processed).toBeTruthy();

    const siteBets = await Database.collection("site-bets").findOne({
      game: "double",
      user: Users.getBasicUser(user),
      betAmount: 100,
      wonAmount: 200,
    });

    expect(siteBets).not.toBeNull();
    expect(siteBets?.won).toBeTruthy();
    expect(siteBets?.wonAmount).toBe(200);

    const transaction = await Database.collection("transactions").findOne({
      gameId: ticketId,
      category: "double",
      kind: "double-won",
    });

    expect(transaction).not.toBeNull();
    expect(transaction?.amount).toBe(200);
  }, 100000);
});
