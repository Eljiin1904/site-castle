import { beforeAll, expect, describe, afterAll, it, vi } from "vitest";
import * as Managers from "./../src/managers";
import { Database } from "@server/services/database";
import { Users } from "@server/services/users";
import { createTestTicket, createTestUser } from "./testUtility";

describe("Dice Manager Test", () => {
  beforeAll(async () => {
    const user = createTestUser();

    // Initialize Server DB
    await Database.createCollection("users", {});
    await Database.createCollection("dice-tickets", {});
    await Database.createCollection("site-bets", {});
    await Database.createCollection("transactions", {});

    await Database.collection("users").insertOne(user);

    Managers.dice();
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

    if (!user) return;

    const ticket = await createTestTicket({
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

    await new Promise((resolve) => setTimeout(resolve, 800));
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
    expect(user).toBeDefined();

    if (!user) return;

    const ticket = await createTestTicket({
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
