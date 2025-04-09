import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { Database } from "@server/services/database";
import { createTestUser, fetchWithCookie, handleLogin } from "../../testUtility";
import { io, Socket } from "socket.io-client";
import config from "#app/config";
import { DiceTicketDocument } from "@core/types/dice/DiceTicketDocument";
import { Limbo } from "@server/services/limbo";
import bcrypt from "bcrypt";

let socket: Socket;
const BASE_URL = config.siteAPI;
const hCaptchaToken = "10000000-aaaa-bbbb-cccc-000000000001"; // from hCatcha's integration test guidance
let globalSessionCookie: string;

const url = config.siteAPI;
async function createSocket() {
  return await io(url, {
    transports: ["websocket"],
  });
}

beforeAll(async () => {
  await Database.collection("site-settings").insertOne({
    _id: "limboEnabled",
    value: true,
    lastUpdateDate: new Date(),
  });
  const passwordHash = await bcrypt.hash("password123", 8);
  const user = createTestUser(
    "limboListenerTester",
    "limboListenerTester@gmail.com",
    "user",
    passwordHash,
  );

  await Database.collection("users").insertOne(user);
  const [sessionResponse, sessionCookie] = await handleLogin(
    config.siteAPI,
    {
      username: user.username,
      password: "password123",
    },
    hCaptchaToken,
  );

  globalSessionCookie = sessionCookie;

  try {
    socket = await createSocket();
  } catch (err) {
    console.log("Errr " + err);
  }
});

afterAll(() => {
  if (socket) socket.close();
});

describe("Listener Game Test ", async () => {
  it("Join Listener Game Feed", async () => {
    if (socket == null) return;

    const user = await Database.collection("users").findOne({ username: "limboListenerTester" });

    if (!user) return;

    const handleSocketEvents = new Promise((resolve) => {
      socket.on("limbo-init", (message) => {
        resolve(message);
      });
    });

    socket.emit("limbo-join", user._id);

    const message: any = await handleSocketEvents;

    expect(message.hasOwnProperty("feed")).toBe(true);
    expect(message.hasOwnProperty("history")).toBe(true);

    socket.emit("limbo-leave");
  });

  it("Test Insert Limbo Ticket Feed", async () => {
    const user = await Database.collection("users").findOne({ username: "limboListenerTester" });
    if (!user) return;

    const handleInitSocketEvents = new Promise((resolve) => {
      socket.on("limbo-init", (message) => {
        resolve(message);
      });
    });

    socket.emit("limbo-join", user._id);

    await handleInitSocketEvents;

    const range = Limbo.getTargetMinMax();
    let url = BASE_URL + "/limbo/post-ticket";

    let getLimbo = await fetchWithCookie(
      url,
      "POST",
      {
        betAmount: 500,
        targetValue: range.min,
      },
      globalSessionCookie,
    );

    if (socket == null) return;

    // // Capture Message for insert
    const handleSocketEvents = new Promise<DiceTicketDocument>((resolve) => {
      socket.on("limbo-insert", (message) => {
        resolve(message);
      });
    });

    const message: any = await handleSocketEvents;

    expect(getLimbo.status).toBe(200);
    expect(message.betAmount).toBe(500);
    expect(message.targetValue).toBe(range.min);
    expect(message.user.id).toBe(user._id);
    expect(message.won).toBeOneOf([true, false]);
    expect(message.wonAmount).toBeDefined();

    socket.emit("limbo-leave");
  }, 10000);

  it("Test Leaving Limbo Ticket Feed", async () => {
    const user = await Database.collection("users").findOne({ username: "limboListenerTester" });
    if (!user) return;

    const handleInitSocketEvents = new Promise((resolve) => {
      socket.on("limbo-init", (message) => {
        resolve(message);
      });
    });

    socket.emit("limbo-join", user._id);

    await handleInitSocketEvents;

    const range = Limbo.getTargetMinMax();
    let url = BASE_URL + "/limbo/post-ticket";

    let getLimbo = await fetchWithCookie(
      url,
      "POST",
      {
        betAmount: 500,
        targetValue: range.min,
      },
      globalSessionCookie,
    );

    if (socket == null) return;

    socket.emit("limbo-leave");

    // Capture Message for insert
    const handleInsertSocketEvent = new Promise((resolve, reject) => {
      socket.on("limbo-insert", (message) => {
        resolve(message);
      });

      setTimeout(() => {
        reject(new Error("Message not received on insert"));
      }, 1000);
    });

    await expect(handleInsertSocketEvent).rejects.toThrow("Message not received on insert");
  });

  it("Retreive Listener Init Game Feed with History & Feed", async () => {
    if (socket == null) return;

    const user = await Database.collection("users").findOne({ username: "limboListenerTester" });

    if (!user) return;

    const handleSocketEvents = new Promise((resolve) => {
      socket.on("limbo-init", (message) => {
        resolve(message);
      });
    });

    socket.emit("limbo-join", user._id);

    const message: any = await handleSocketEvents;

    expect(message.hasOwnProperty("feed")).toBe(true);
    expect(message.hasOwnProperty("history")).toBe(true);
    expect(message["feed"].length).greaterThan(0);
    expect(message["history"].length).greaterThan(0);

    socket.emit("limbo-leave");
  });
});
