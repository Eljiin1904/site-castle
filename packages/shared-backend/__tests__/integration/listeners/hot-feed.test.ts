import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { Database } from "@server/services/database";
import { createTestUser } from "../../testUtility";
import { io, Socket } from "socket.io-client";
import config from "#app/config";
import { SiteBetDocument } from "@core/types/site/SiteBetDocument";
import { Ids } from "@server/services/ids";
import { Users } from "@core/services/users";
import { HotSiteGameDetails } from "@core/types/site/HotSiteGame";

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
  await Database.createCollection("site-games", {});
  await Database.createCollection("transactions", {});

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

describe("Hot Feed Test ", async () => {
  it("Setup Hot Feed", async () => {
    if (socket == null) return;

    const handleSocketEvents = new Promise<HotSiteGameDetails[]>((resolve) => {
      socket.on("hot-feed-init", (message: HotSiteGameDetails[]) => {
        resolve(message);
      });
    });

    // Join the Hot Feed to receive all "Hot" Games
    socket.emit("hot-feed-join");

    const message: HotSiteGameDetails[] = await handleSocketEvents;
    expect(message.length).toBe(6);

    const games = message.map((game) => game.game);
    expect(games).toEqual(["crash", "duel", "dice", "limbo", "blackjack", "mines"]);

    const ranks = message.map((game) => game.rank);
    expect(ranks).toEqual([1, 2, 3, 4, 5, 6]);
  });

  //  By Default if not Bets within hour frame, it will return featured games first
  // Followed by latest games added to the site
  it(" Default Hot Feed Updates", async () => {
    if (socket == null) return;

    const user = await Database.collection("users").findOne();

    if (!user) return;

    // await new Promise((resolve) => setTimeout(resolve, 200));
    const handleUpdateSocketEvents = new Promise<HotSiteGameDetails[]>((resolve) => {
      socket.on("hot-feed-update", (update) => {
        resolve(update);
      });
    });

    const updateMessage: HotSiteGameDetails[] = await handleUpdateSocketEvents;

    expect(updateMessage[0].rank).toBe(1);
    expect(updateMessage[0].game).toBe("crash");

    expect(updateMessage[1].rank).toBe(2);
    expect(updateMessage[1].game).toBe("duel");

    socket.emit("hot-feed-leave");
  });

  // Receive updates regarding Hot Games based on won amount within the hour
  it(" Hot Feed Updates", async () => {
    if (socket == null) return;

    const user = await Database.collection("users").findOne();

    if (!user) return;

    socket.emit("hot-feed-join");

    const diceBet: SiteBetDocument = {
      _id: Ids.object(),
      timestamp: new Date(),
      user: Users.getBasicUser(user),
      game: "dice",
      betAmount: 100,
      wonAmount: 300,
      won: true,
      multiplier: 100 / 200,
    };

    const limboBet: SiteBetDocument = {
      _id: Ids.object(),
      timestamp: new Date(),
      user: Users.getBasicUser(user),
      game: "limbo",
      betAmount: 100,
      wonAmount: 200,
      won: true,
      multiplier: 100 / 200,
    };

    await Database.collection("site-bets").insertMany([limboBet, diceBet]);
    await new Promise((resolve) => setTimeout(resolve, 200));

    const handleUpdateSocketEvents = new Promise<HotSiteGameDetails[]>((resolve) => {
      socket.on("hot-feed-update", (update) => {
        resolve(update);
      });
    });

    const updateMessage: HotSiteGameDetails[] = await handleUpdateSocketEvents;

    expect(updateMessage[0].rank).toBe(1);
    expect(updateMessage[0].game).toBe("dice");

    expect(updateMessage[1].rank).toBe(2);
    expect(updateMessage[1].game).toBe("limbo");

    socket.emit("hot-feed-leave");
  });

  // Receive updates regarding Hot Games based on won amount within the hour
  it("Stop receiving Hot Feed Updates on Leave", async () => {
    if (socket == null) return;

    const user = await Database.collection("users").findOne();

    if (!user) return;

    socket.emit("hot-feed-join");

    await new Promise((resolve) => setTimeout(resolve, 200));

    socket.emit("hot-feed-leave");

    const handleUpdateSocketEvents = new Promise((resolve, reject) => {
      socket.on("hot-feed-update", (message) => {
        resolve(message);
      });

      setTimeout(() => {
        reject(new Error("Message not received on update"));
      }, 2000);
    });

    await expect(handleUpdateSocketEvents).rejects.toThrow("Message not received on update");
  });
}, 10000);
