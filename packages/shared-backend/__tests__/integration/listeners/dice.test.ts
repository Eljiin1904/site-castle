import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { Database } from "@server/services/database";
import { createTestTicket, createTestUser } from "../../testUtility";
import { io, Socket } from "socket.io-client";
import config from "#app/config";
import { DiceTicketDocument } from "@core/types/dice/DiceTicketDocument";

let socket: Socket;

const url = config.siteAPI;
async function createSocket() {
  return await io(url, {
    transports: ["websocket"],
  });
}

beforeAll(async () => {
  const user = createTestUser("tester1", "test1@gmail.com", "user", "password123");

  if (await Database.hasCollection("dice-tickets")) {
    Database.collection("dice-tickets").drop();
  }

  // Initialize Server DB
  await Database.createCollection("users", {});
  await Database.createCollection("dice-tickets", {});
  await Database.createCollection("site-bets", {});
  await Database.createCollection("site-activity", {});
  await Database.createCollection("transactions", {});
  await Database.createCollection("site-settings", {});

  // Create Setting for Threshold for High Roller Bet
  await Database.collection("site-settings").insertOne({
    _id: "betHighrollerThreshold",
    value: 100,
    lastUpdateDate: new Date(),
  });

  await Database.collection("users").insertOne(user);
  try {
    socket = await createSocket();
  } catch (err) {
    console.log("Errr " + err);
  }
});

afterAll(() => {
  if (socket) socket.close();
});

describe("Dice Game Test ", async () => {
  it("Join Dice Game Feed", async () => {
    if (socket == null) return;

    const user = await Database.collection("users").findOne();

    if (!user) return;

    const handleSocketEvents = new Promise((resolve) => {
      socket.on("dice-init", (message) => {
        resolve(message);
      });
    });

    // Join the Bet Feed to receive all Bets
    socket.emit("dice-join", user._id);

    //Expect initial Bet Feed to be Empty
    const message = await handleSocketEvents;
    expect(message).toStrictEqual({
      feed: [],
      history: [],
    });
  });

  it("Test Insert and Leaving Dice Ticket Feed", async () => {
    const user = await Database.collection("users").findOne();
    if (!user) return;

    // Create and InsertTicket for Dice
    let ticket = await createTestTicket({
      user,
      targetKind: "over",
      targetValue: 4,
      rollValue: 5,
    });
    await Database.collection("dice-tickets").insertOne(ticket);

    await new Promise((resolve) => setTimeout(resolve, 200));

    if (socket == null) return;

    // // Capture Message for insert
    const handleSocketEvents = new Promise<DiceTicketDocument>((resolve) => {
      socket.on("dice-insert", (message) => {
        resolve(message);
      });
    });

    const message = await handleSocketEvents;

    // // Make sure message is the message expected
    expect(message._id).toBe(ticket._id);
    expect(message.multiplier).toBe(ticket.multiplier);
    expect(message.betAmount).toBe(ticket.betAmount);
    expect(message.wonAmount).toBe(ticket.wonAmount);
    expect(message.user.id).toBe(user._id);
    expect(message.won).toBe(true);

    // Send Leave Bet Feed Event
    socket.emit("dice-leave");
    ticket = await createTestTicket({
      user,
      targetKind: "over",
      targetValue: 4,
      rollValue: 6,
    });
    await Database.collection("dice-tickets").insertOne(ticket);

    await new Promise((resolve) => setTimeout(resolve, 200));

    // Capture Message for insert
    const handleInsertSocketEvent = new Promise((resolve, reject) => {
      socket.on("dice-insert", (message) => {
        resolve(message);
      });

      setTimeout(() => {
        reject(new Error("Message not received on insert"));
      }, 1000);
    });

    await expect(handleInsertSocketEvent).rejects.toThrow("Message not received on insert");
  }, 10000);
});
