import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { Database } from "@server/services/database";
import { createTestUser, fetchWithCookie, handleLogin } from "../../testUtility";
import { io, Socket } from "socket.io-client";
import config from "#app/config";
import bcrypt from "bcrypt";
import { DoubleRoundDocument } from "@core/types/double/DoubleRoundDocument";
import { Ids } from "@server/services/ids";
import { Random } from "@server/services/random";

let socket: Socket;

const BASE_URL = config.siteAPI;
const hCaptchaToken = "10000000-aaaa-bbbb-cccc-000000000001"; // from hCatcha's integration test guidance
let globalSessionCookie: string;

async function createSocket() {
  return await io(BASE_URL, {
    transports: ["websocket"],
  });
}

beforeAll(async () => {
  const passwordHash = await bcrypt.hash("password123", 8);
  const user = createTestUser(
    "doubleListener",
    "doubleListener@gmail.com",
    "user",
    passwordHash,
    100000,
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
  await Database.collection("site-settings").insertOne({
    _id: "doubleEnabled",
    value: true,
    lastUpdateDate: new Date(),
  });
  try {
    socket = await createSocket();
  } catch (err) {
    console.log("Errr " + err);
  }
});

afterAll(() => {
  if (socket) socket.close();
});

describe("Double Game Test ", async () => {
  it("Join Double Feed", async () => {
    if (socket == null) return;

    const user = await Database.collection("users").findOne({ username: "doubleListener" });

    if (!user) return;

    const handleSocketEvents = new Promise((resolve) => {
      socket.on("double-init", (message) => {
        resolve(message);
      });
    });

    // Join the Bet Feed to receive all Bets
    socket.emit("double-join", user._id);

    //Expect initial Bet Feed to be Empty
    const message: any = await handleSocketEvents;

    expect(message.hasOwnProperty("round")).toBe(true);
    expect(message.hasOwnProperty("history")).toBe(true);
    expect(message.hasOwnProperty("tickets")).toBe(true);
    expect(message.hasOwnProperty("jackpot")).toBe(true);
  });

  it("Insert Double Round ", async () => {
    const user = await Database.collection("users").findOne({
      username: "doubleListener",
    });
    if (!user) return;

    const roundId = await Ids.incremental({
      key: "doubleRoundId",
      baseValue: 1000000,
      batchSize: 1,
    });

    const serverSeed = Ids.secret();
    const serverSeedHash = Random.hashServerSeed(serverSeed);

    const round: DoubleRoundDocument = {
      _id: roundId,
      timestamp: new Date(),
      serverSeed,
      serverSeedHash,
      status: "waiting",
      statusDate: new Date(),
    };

    await Database.collection("double-rounds").insertOne(round);

    const handleSocketEvents = new Promise((resolve) => {
      socket.on("double-round-insert", (message) => {
        resolve(message);
      });
    });
    const message: any = await handleSocketEvents;

    expect(message._id).toBe(roundId);
    expect(message.status).toBe("waiting");
  });

  it("Insert Double Ticket Round ", async () => {
    const user = await Database.collection("users").findOne({
      username: "doubleListener",
    });
    if (!user) return;
    const round = await Database.collection("double-rounds").findOne({
      status: "waiting",
    });
    if (!round) return;
    const handleSocketEvents = new Promise((resolve) => {
      socket.on("double-bet-insert", (message) => {
        resolve(message);
      });
    });

    let url = BASE_URL + "/double/post-ticket";
    let createDoubleTicket = await fetchWithCookie(
      url,
      "POST",
      {
        roundId: round?._id,
        betKind: "green",
        betAmount: 10000,
      },
      globalSessionCookie,
    );
    const getDoubleResult = await createDoubleTicket.json();

    const message: any = await handleSocketEvents;

    expect(message.roundId).toBe(round._id);
    expect(message.user.id).toBe(user._id);
    expect(message.betAmount).toBe(10000);
    expect(message.betKind).toBe("green");
  });

  it("Update Double Round ", async () => {
    const round = await Database.collection("double-rounds").findOne({
      status: "waiting",
    });
    if (!round) return;

    await Database.collection("double-rounds").updateOne(
      { _id: round?._id },
      {
        $set: { status: "completed" },
      },
    );

    const handleSocketEvents = new Promise((resolve) => {
      socket.on("double-round-update", (message) => {
        resolve(message);
      });
    });
    const message: any = await handleSocketEvents;

    expect(message.documentId).toBe(round._id);
    expect(message.updatedFields.status).toBe("completed");
  });

  it("Leave Double Feed ", async () => {
    const user = await Database.collection("users").findOne({
      username: "doubleListener",
    });
    if (!user) return;
    socket.emit("double-leave", user._id);

    const roundId = await Ids.incremental({
      key: "doubleRoundId",
      baseValue: 1000000,
      batchSize: 1,
    });

    const serverSeed = Ids.secret();
    const serverSeedHash = Random.hashServerSeed(serverSeed);

    const round: DoubleRoundDocument = {
      _id: roundId,
      timestamp: new Date(),
      serverSeed,
      serverSeedHash,
      status: "waiting",
      statusDate: new Date(),
    };

    await Database.collection("double-rounds").insertOne(round);

    const handleSocketEvents = new Promise((resolve, reject) => {
      socket.on("double-round-insert", (message) => {
        resolve(message);
      });

      setTimeout(() => {
        reject(new Error("Message not received on insert"));
      }, 1000);
    });
    await expect(handleSocketEvents).rejects.toThrow("Message not received on insert");
  });
});
