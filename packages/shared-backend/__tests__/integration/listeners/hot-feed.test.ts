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
  const user = createTestUser("tester3", "test3@gmail.com", "user", "password123");

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
    expect(games).toContain("crash");
    // expect(games).toContain("duel");

    const ranks = message.map((game) => game.rank);
    expect(ranks).toStrictEqual([1, 2, 3, 4, 5, 6]);

    socket.emit("hot-feed-leave");
  });

  //  By Default if not Bets within hour frame, it will return featured games first
  // Followed by latest games added to the site
  it(" Default Hot Feed Updates", async () => {
    if (socket == null) return;

    const user = await Database.collection("users").findOne({ username: "tester3" });

    if (!user) return;
    // Join the Hot Feed to receive all "Hot" Games
    socket.emit("hot-feed-join");

    // await new Promise((resolve) => setTimeout(resolve, 200));
    const handleUpdateSocketEvents = new Promise<HotSiteGameDetails[]>((resolve) => {
      socket.on("hot-feed-update", (update) => {
        resolve(update);
      });
    });

    const updateMessage: HotSiteGameDetails[] = await handleUpdateSocketEvents;
    expect(updateMessage.length).toBe(6);

    const games = updateMessage.map((game) => game.game);
    expect(games).toContain("crash");
    // expect(games).toContain("duel");

    const ranks = updateMessage.map((game) => game.rank);
    expect(ranks).toStrictEqual([1, 2, 3, 4, 5, 6]);

    socket.emit("hot-feed-leave");
  });

  // // Receive updates regarding Hot Games based on won amount within the hour
  // it(" Hot Feed Updates", async () => {
  //   if (socket == null) return;

  //   const user = await Database.collection("users").findOne({ username: "tester3" });

  //   if (!user) return;

  //   socket.emit("hot-feed-join");

  //   const diceBet: SiteBetDocument = {
  //     _id: Ids.object(),
  //     timestamp: new Date(),
  //     user: Users.getBasicUser(user),
  //     game: "dice",
  //     betAmount: 100,
  //     wonAmount: 300,
  //     won: true,
  //     multiplier: 100 / 200,
  //   };

  //   const limboBet: SiteBetDocument = {
  //     _id: Ids.object(),
  //     timestamp: new Date(),
  //     user: Users.getBasicUser(user),
  //     game: "limbo",
  //     betAmount: 100,
  //     wonAmount: 200,
  //     won: true,
  //     multiplier: 100 / 200,
  //   };

  // await Database.collection("site-bets").insertMany([limboBet, diceBet]);
  // await new Promise((resolve) => setTimeout(resolve, 200));

  // const handleUpdateSocketEvents = new Promise<HotSiteGameDetails[]>((resolve) => {
  //   socket.on("hot-feed-update", (update) => {
  //     resolve(update);
  //   });
  // });

  // const updateMessage: HotSiteGameDetails[] = await handleUpdateSocketEvents;

  // const games = updateMessage.map((game) => game.game);
  // expect(games).toContain("dice");
  // expect(games).toContain("limbo");
  // socket.emit("hot-feed-leave");
  // });

  // // Receive updates regarding Hot Games based on won amount within the hour
  // it("Stop receiving Hot Feed Updates on Leave", async () => {
  //   if (socket == null) return;

  //   const user = await Database.collection("users").findOne({ username: "tester3" });

  //   if (!user) return;

  //   socket.emit("hot-feed-join");

  //   await new Promise((resolve) => setTimeout(resolve, 200));

  //   socket.emit("hot-feed-leave");

  //   const handleUpdateSocketEvents = new Promise((resolve, reject) => {
  //     socket.on("hot-feed-update", (message) => {
  //       resolve(message);
  //     });

  //     setTimeout(() => {
  //       reject(new Error("Message not received on update"));
  //     }, 2000);
  //   });

  //   await expect(handleUpdateSocketEvents).rejects.toThrow("Message not received on update");
  // });
}, 10000);
