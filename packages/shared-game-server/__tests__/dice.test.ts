import { beforeAll, expect, describe, it, assert } from "vitest";
import * as Managers from "./../src/managers";
import { Database } from "@server/services/database";
import { Users } from "@server/services/users";
import { createDiceTestTicket, createTestUser, resetDatabaseConnections } from "./testUtility";

describe("Dice Manager Test", () => {
  beforeAll(async () => {
    const user = createTestUser();

    // Initialize Server DB
    await Promise.allSettled([
      resetDatabaseConnections(["dice-tickets", "site-bets", "transactions"]),
      Database.collection("users").deleteOne({
        _id: user._id,
      }),
    ]);

    await Database.collection("users").insertOne(user);
  }, 20000);

  it("test manager initialization", async () => {
    expect(await Database.hasCollection("dice-tickets")).toBeTruthy();
    expect(await Database.hasCollection("users")).toBeTruthy();
    expect(await Database.hasCollection("site-bets")).toBeTruthy();
    expect(await Database.hasCollection("transactions")).toBeTruthy();
  });

  it("create a dice game bet (won)", async () => {
    const user = await Database.collection("users").findOne();
    expect(user).toBeDefined();

    if (!user) {
      assert.fail("User not found failure"); // Asseting failure
    }

    const ticket = await createDiceTestTicket({
      user,
      targetKind: "over",
      targetValue: 4,
      rollValue: 5,
    });

    await Database.collection("dice-tickets").insertOne(ticket);

    await new Promise((resolve) => setTimeout(resolve, 800));

    const siteBets = await Database.collection("site-bets").findOne({
      game: "dice",
      user: Users.getBasicUser(user),
    });

    expect(siteBets).not.toBeNull();
    expect(siteBets?.won).toBeTruthy();
    expect(siteBets?.wonAmount).toBe(96);

    // The start change has a 500 ms wait before populating collection

    await new Promise((resolve) => setTimeout(resolve, 1000));
    const transaction = await Database.collection("transactions").findOne({
      kind: "dice-won",
      gameId: ticket._id,
    });

    expect(transaction).toBeDefined();
    expect(transaction?.status).toBe("completed");
    expect(transaction?.kind).toBe("dice-won");
    expect(transaction?.balance).greaterThan(0);
    expect(transaction?.category).toBe("dice");
  });

  it("create a dice game bet (lose)", async () => {
    const user = await Database.collection("users").findOne();
    if (!user) {
      assert.fail("User not found failure");
    }
    expect(user).toBeDefined();

    const ticket = await createDiceTestTicket({
      user,
      targetKind: "under",
      targetValue: 4,
      rollValue: 5,
    });

    await Database.collection("dice-tickets").insertOne(ticket);

    await new Promise((resolve) => setTimeout(resolve, 800));

    const siteBets = await Database.collection("site-bets").findOne({
      game: "dice",
      user: Users.getBasicUser(user),
      won: false,
    });

    expect(siteBets).not.toBeNull();
    expect(siteBets?.won).toBeFalsy();

    const transaction = await Database.collection("transactions").findOne({
      kind: "dice-won",
      gameId: ticket._id,
    });

    expect(transaction).toBeNull();
  });
});
