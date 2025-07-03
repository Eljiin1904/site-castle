import { beforeAll, expect, describe, it } from "vitest";
import * as Managers from "../src/managers";
import { Database } from "@server/services/database";
import { Ids } from "@server/services/ids";
import { createTestLimboTicket, createTestUser, resetDatabaseConnections } from "./testUtility";
import { Limbo } from "@core/services/limbo";
import { Intimal } from "@core/services/intimal";
import { Users } from "@server/services/users";

describe("Limbo Manager Test", () => {
  beforeAll(async () => {
    const user = createTestUser();

    // Initialize Server DB
    await Promise.allSettled([
      Database.collection("users").deleteOne({
        _id: user._id,
      }),
      resetDatabaseConnections(["limbo-tickets", "site-bets", "transactions"]),
    ]);

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
    const limboTicket = await createTestLimboTicket({
      betAmount,
      rollValue: max,
      targetValue: min,
      user,
    });

    await Database.collection("limbo-tickets").insertOne(limboTicket);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const siteBite = await Database.collection("site-bets").findOne({
      game: "limbo",
      user: Users.getBasicUser(user),
      betAmount: betAmount,
    });

    await new Promise((resolve) => setTimeout(resolve, 1000));

    expect(siteBite?.betAmount).not.toBeNull();
    const transaction = await Database.collection("transactions").findOne({
      category: "limbo",
      status: "completed",
      kind: "limbo-won",
    });

    expect(transaction).toBeDefined();
    expect(transaction?.kind).toBe("limbo-won");
    expect(+Number(transaction?.amount).toFixed(2)).toBe(
      +Number(betAmount * limboTicket.multiplier).toFixed(2),
    );
  }, 10000);

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
