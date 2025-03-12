import { beforeAll, expect, describe, afterAll, it, vi } from "vitest";
import * as Managers from "../managers";
import { Database } from "@server/services/database";
import { Ids } from "@server/services/ids";
import { createTestLimboTicket, createTestUser } from "./testUtility";
import { Limbo } from "@core/services/limbo";
import { Numbers } from "@core/services/numbers";
import { Intimal } from "@core/services/intimal";
import { Users } from "@server/services/users";

describe("Dice Manager Test", () => {
  beforeAll(async () => {
    const user = createTestUser();

    // Initialize Server DB
    await Database.createCollection("users", {});
    await Database.createCollection("limbo-tickets", {});
    await Database.createCollection("site-bets", {});
    await Database.createCollection("transactions", {});
    await Database.collection("users").insertOne(user);

    Managers.limbo();
  }, 20000);

  it("test manager initialization", async () => {
    expect(await Database.hasCollection("limbo-tickets")).toBeTruthy();
    expect(await Database.hasCollection("users")).toBeTruthy();
    expect(await Database.hasCollection("site-bets")).toBeTruthy();
    expect(await Database.hasCollection("transactions")).toBeTruthy();
  });

  it("create a limbo game bet (win)", async () => {
    const user = await Database.collection("users").findOne();
    expect(user).toBeDefined();

    if (!user) return;

    const betAmount = Intimal.fromDecimal(10);
    const { min, max } = Limbo.getTargetMinMax();
    const targetValue = Numbers.randomInt(min, max);
    const limboTicket = await createTestLimboTicket({
      betAmount,
      rollValue: 5,
      targetValue,
      user,
    });

    await Database.collection("limbo-tickets").insertOne(limboTicket);
    // The start change has a 500 ms wait before populating collection
    setTimeout(() => {}, 500);
    const siteBite = await Database.collection("site-bets").findOne({
      game: "limbo",
      user: Users.getBasicUser(user),
      betAmount: betAmount,
    });

    expect(siteBite?.betAmount).not.toBeNull();
    const transaction = await Database.collection("transactions").findOne({
      category: "limbo",
      status: "completed",
      kind: "limbo-won",
    });

    expect(transaction).toBeDefined();
    expect(transaction?.kind).toBe("limbo-won");
  });

  it("create a limbo game bet (lose)", async () => {
    const user = await Database.collection("users").findOne();
    expect(user).toBeDefined();

    if (!user) return;

    const ticketId = await Ids.incremental({
      key: "limboTicketId",
      baseValue: 1000001,
      batchSize: 100,
    });

    const rollValue = 4;
    const betAmount = 250;
    const targetValue = 6;

    const limboTicket = await createTestLimboTicket({
      rollValue,
      user,
      betAmount,
      targetValue,
    });

    await Database.collection("limbo-tickets").insertOne(limboTicket);

    await new Promise((resolve) => setTimeout(resolve, 750));

    const siteBets = await Database.collection("site-bets").findOne({
      game: "limbo",
      user: Users.getBasicUser(user),
      betAmount: betAmount,
    });

    expect(siteBets).not.toBeNull();
    const transaction = await Database.collection("transactions").findOne({
      _id: ticketId,
      category: "limbo",
      status: "completed",
    });

    expect(transaction).toBeNull();
  });
});
