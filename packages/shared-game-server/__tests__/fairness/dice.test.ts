// Libraries
import { beforeAll, expect, describe, it } from "vitest";
// Dice Setup
import * as Managers from "../../src/managers";
// Services
import { Database } from "@server/services/database";
import { Dice } from "@core/services/dice";
import { Random } from "@server/services/random";
// Helpers
import { createTicket } from "@server/services/dice/Dice";
// Testing helpers
import { createTestUser, resetDatabaseConnections } from "../testUtility";
// Data for tests
import { bets } from "./data/dice";

describe("Dice Fairness", () => {
  let diceFairnesssTester = { ...createTestUser("dice-fairness-tester"), tokenBalance: 1000000000 };

  const addTicketsToDatabase = async () => {
    for (const bet of bets) {
      await createTicket({
        user: diceFairnesssTester,
        location: {
          ip: "127.01.01",
        },
        ...bet,
      });
      await new Promise((resolve) => setTimeout(resolve, 4000));
    }
  };

  beforeAll(async () => {
    await Database.collection("users").deleteOne({
      username: "dice-fairness-tester",
    });

    await Promise.all([
      resetDatabaseConnections(["dice-tickets"]),
      Database.collection("users").insertOne(diceFairnesssTester),
    ]);

    Managers.dice();
    await addTicketsToDatabase();
  });

  it("Should test the inserted bets against the expected roll", async () => {
    const diceTesterTickets = await Database.collection("dice-tickets")
      .find({
        "user.name": "dice-fairness-tester",
      })
      .toArray();
    expect(diceTesterTickets.length).toBe(bets.length);
    for (const ticket of diceTesterTickets) {
      const { serverSeed, clientSeed, nonce, rollValue } = ticket;
      const diceRollSimulation = Random.getRoll({
        serverSeed,
        clientSeed,
        nonce,
        minValue: 0,
        maxValue: Dice.maxValue + 1,
      });
      expect(diceRollSimulation).toEqual(rollValue);
    }
  });

  it("Should compare a roll with pre-determined client and server seeds, and a changing pre-determined user nonce", () => {
    const serverSeed = "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
    const clientSeed = "BBBBBBBBBBBB";
    let nonce = 0;
    const diceRollSimulation = Random.getRoll({
      serverSeed,
      clientSeed,
      nonce,
      minValue: 0,
      maxValue: Dice.maxValue + 1,
    });
    expect(diceRollSimulation).toEqual(9044);
    nonce++;
    expect(
      Random.getRoll({
        serverSeed,
        clientSeed,
        nonce,
        minValue: 0,
        maxValue: Dice.maxValue + 1,
      }),
    ).toEqual(3635);
  });
});
