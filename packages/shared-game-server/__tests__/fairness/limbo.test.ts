// Libraries
import { beforeAll, expect, describe, it } from "vitest";
// Limbo Setup
import * as Managers from "../../src/managers";
// Services
import { Database } from "@server/services/database";
import { Limbo } from "@core/services/limbo";
import { Random } from "@server/services/random";
// Helpers
import { createTicket } from "@server/services/limbo/Limbo";
// Testing helpers
import { createTestUser, resetDatabaseConnections } from "../testUtility";
// Data for tests
import { bets } from "./data/limbo";

describe("Limbo Fairness", () => {
  let limboFairnesssTester = {
    ...createTestUser("limbo-fairness-tester", "limbotester@pidwin.com"),
    tokenBalance: 1000000000,
  };

  const addTicketsToDatabase = async () => {
    for (const bet of bets) {
      await createTicket({
        user: limboFairnesssTester,
        location: {
          ip: "127.01.01",
        },
        ...bet,
      });
      await new Promise((resolve) => setTimeout(resolve, 4000));
    }
  };

  beforeAll(async () => {
    await Promise.all([
      Database.collection("users").deleteOne({
        username: "limbo-fairness-tester",
      }),
      resetDatabaseConnections(["limbo-tickets"]),
    ]);

    await Database.collection("users").insertOne(limboFairnesssTester);
    await addTicketsToDatabase();
  });

  it("Should test the inserted bets against the expected roll", async () => {
    const limboTesterTickets = await Database.collection("limbo-tickets")
      .find({
        "user.name": "limbo-fairness-tester",
      })
      .toArray();
    expect(limboTesterTickets.length).toBe(bets.length);
    for (const ticket of limboTesterTickets) {
      const { serverSeed, clientSeed, nonce, rollValue } = ticket;
      const limboRollSimulation = Random.getRoll({
        serverSeed,
        clientSeed,
        nonce,
        minValue: 1,
        maxValue: Limbo.maxValue,
      });
      expect(limboRollSimulation).toEqual(rollValue);
    }
  });

  it("Should compare a roll with pre-determined client and server seeds, and a changing pre-determined user nonce", () => {
    const serverSeed = "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
    const clientSeed = "BBBBBBBBBBBB";
    let nonce = 0;
    const limboRollSimulation = Random.getRoll({
      serverSeed,
      clientSeed,
      nonce,
      minValue: 1,
      maxValue: Limbo.maxValue,
    });
    expect(limboRollSimulation).toEqual(65235559);
    nonce++;
    expect(
      Random.getRoll({
        serverSeed,
        clientSeed,
        nonce,
        minValue: 1,
        maxValue: Limbo.maxValue,
      }),
    ).toEqual(79131519);
  });
});
