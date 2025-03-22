import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { Database } from "@server/services/database";
import { createTestTicket, createTestUser } from "../../testUtility";
import { io, Socket } from "socket.io-client";
import config from "#app/config";
import { SiteBetDocument } from "@core/types/site/SiteBetDocument";
import { Ids } from "@server/services/ids";
import { Users } from "@core/services/users";

let socket: Socket;

const url = config.siteAPI;
async function createSocket() {
  return await io(url, {
    transports: ["websocket"],
  });
}

beforeAll(async () => {
  const user = createTestUser("tester1", "test1@gmail.com", "user", "password123");

  if (!(await Database.hasCollection("dice-tickets"))) {
    await Database.createCollection("dice-tickets", {});
  }
  if (!(await Database.hasCollection("users"))) {
    await Database.createCollection("users", {});
  }

  // Initialize Server DB
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

describe("Bet Feed Test ", async () => {
  it("Setup Feed", async () => {
    if (socket == null) return;

    const user = await Database.collection("users").findOne();

    if (!user) return;

    const handleSocketEvents = new Promise<SiteBetDocument[]>((resolve) => {
      socket.on("bet-feed-init", (message) => {
        resolve(message);
      });
    });

    // Join the Bet Feed to receive all Bets
    socket.emit("bet-feed-join", "all");

    //Expect initial Bet Feed to be Empty
    const message: SiteBetDocument[] = await handleSocketEvents;
    expect(message).toStrictEqual([]);
  });

  it("Insert Dice Ticket into Feed", async () => {
    const user = await Database.collection("users").findOne();
    if (!user) return;

    // Create and InsertTicket for Dice
    const ticket = await createTestTicket({
      user,
      targetKind: "over",
      targetValue: 4,
      rollValue: 5,
    });
    await Database.collection("dice-tickets").insertOne(ticket);

    await new Promise((resolve) => setTimeout(resolve, 800));

    if (socket == null) return;

    //  Create and insert Bet
    let betTimestamp = new Date();
    const bet: SiteBetDocument = {
      _id: Ids.object(),
      user: Users.getBasicUser(user),
      game: "dice",
      timestamp: betTimestamp,
      multiplier: 0.5,
      betAmount: 1000,
      won: true,
      wonAmount: 1500,
    };

    await Database.collection("site-bets").insertOne(bet);

    // Capture Message for insert
    const handleSocketEvents = new Promise<SiteBetDocument>((resolve) => {
      socket.on("bet-feed-insert", (message) => {
        resolve(message);
      });
    });

    const message = await handleSocketEvents;

    // Make sure message is the message expected
    expect(message.multiplier).toBe(0.5);
    expect(message.betAmount).toBe(1000);
    expect(message.wonAmount).toBe(1500);
    expect(message.won).toBe(true);
    expect(new Date(message.timestamp)).toStrictEqual(bet.timestamp);
  }, 10000);

  it("Leave Feed", async () => {
    if (socket == null) return;

    const user = await Database.collection("users").findOne();
    if (!user) return;

    // Send Leave Bet Feed Event
    socket.emit("bet-feed-leave", "all");

    const ticket = await createTestTicket({
      user,
      targetKind: "under",
      targetValue: 4,
      rollValue: 3,
    });

    // Insert Bet
    await Database.collection("dice-tickets").insertOne(ticket);
    await new Promise((resolve) => setTimeout(resolve, 250));

    // Left Feed so, expect no messages to be returned on insert
    const handleSocketEvents = new Promise((resolve, reject) => {
      socket.on("bet-feed-insert", (message) => {
        resolve(message);
      });

      setTimeout(() => {
        reject(new Error("Message not received on insert"));
      }, 2000);
    });

    await expect(handleSocketEvents).rejects.toThrow("Message not received on insert");
  }, 10000);

  it("Insert Dice Ticket into HighRoller Feed", async () => {
    const user = await Database.collection("users").findOne();
    if (!user) return;

    // Rejoin Feed
    const handleInitSocketEvent = new Promise<SiteBetDocument[]>((resolve) => {
      socket.on("bet-feed-init", (message) => {
        resolve(message);
      });
    });

    // Join Feed for Highroller Feed
    socket.emit("bet-feed-join", "highroller");

    // Joining Feed returns Highroller Bets
    const initMessage: SiteBetDocument[] = await handleInitSocketEvent;
    expect(initMessage.length).toBe(0);

    const ticket = await createTestTicket({
      user,
      targetKind: "over",
      targetValue: 4,
      rollValue: 5,
    });

    await Database.collection("dice-tickets").insertOne(ticket);
    await new Promise((resolve) => setTimeout(resolve, 800));

    if (socket == null) return;
    let betTimestamp = new Date();

    // Create and Insert a Bet Above High Roller Threshold
    const aboveThresholdBet: SiteBetDocument = {
      _id: Ids.object(),
      user: Users.getBasicUser(user),
      game: "dice",
      timestamp: betTimestamp,
      multiplier: 0.5,
      betAmount: 200000000,
      won: true,
      wonAmount: 300000000,
    };

    await Database.collection("site-bets").insertOne(aboveThresholdBet);

    const handleSocketEvents = new Promise<SiteBetDocument>((resolve) => {
      socket.on("bet-feed-insert", (message) => {
        resolve(message);
      });
    });

    // Insert Message return Bet Document
    const message: SiteBetDocument = await handleSocketEvents;

    expect(message._id).toBe(aboveThresholdBet._id);
    expect(message.multiplier).toBe(0.5);
    expect(message.betAmount).toBe(200000000);
    expect(new Date(message.timestamp)).toStrictEqual(aboveThresholdBet.timestamp);

    // Create a non High Roller Bet
    const belowThresholdBet: SiteBetDocument = {
      _id: Ids.object(),
      user: Users.getBasicUser(user),
      game: "dice",
      timestamp: betTimestamp,
      multiplier: 0.5,
      betAmount: 1000,
      won: true,
      wonAmount: 1500,
    };

    await Database.collection("site-bets").insertOne(belowThresholdBet);
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Expects no insert event due to bet not being a Highroller Event
    const handleBelowThresholdEvents = new Promise((resolve, reject) => {
      socket.on("bet-feed-insert", (message) => {
        resolve(message);
      });

      setTimeout(() => {
        reject(new Error("Message not received due to being below threshold"));
      }, 2000);
    });

    await expect(handleBelowThresholdEvents).rejects.toThrow(
      "Message not received due to being below threshold",
    );
  }, 10000);
});
