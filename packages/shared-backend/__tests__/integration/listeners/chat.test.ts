import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { Database } from "@server/services/database";
import { createTestUser, handleLogin } from "../../testUtility";
import { io, Socket } from "socket.io-client";
import config from "#app/config";
import bcrypt from "bcrypt";
import { Ids } from "@server/services/ids";
import { Users } from "@core/services/users";
import { Chat } from "@server/services/chat";
import { ChatRainDocument } from "@core/types/chat/ChatRainDocument";
import { Numbers } from "@core/services/numbers";
import { Site } from "@server/services/site";
import { addMinutes } from "date-fns";
import { Intimal } from "@core/services/intimal";

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
    "chatListener",
    "chatListener@gmail.com",
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
  await Database.collection("site-settings").insertMany([
    {
      _id: "chatEnabled",
      value: true,
      lastUpdateDate: new Date(),
    },
    {
      _id: "rainEnabled",
      value: true,
      lastUpdateDate: new Date(),
    },
  ]);

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
  it("Bad Channel Chat Feed", async () => {
    if (socket == null) return;

    const user = await Database.collection("users").findOne({ username: "chatListener" });

    if (!user) return;

    const handleSocketEvents = new Promise((resolve, reject) => {
      socket.on("chat-stream", (message) => {
        resolve(message);
      });

      setTimeout(() => {
        reject(new Error("Invalid channel"));
      }, 500);
    });

    await Chat.createMessage({
      agent: "user",
      channel: "general-english",
      kind: "text",
      user: Users.getBasicUser(user),
      text: "Message",
    });

    socket.emit("chat-join", null);
    await expect(handleSocketEvents).rejects.toThrow("Invalid channel");
  });

  it("Join and Insert Chat Feed", async () => {
    if (socket == null) return;

    const user = await Database.collection("users").findOne({ username: "chatListener" });

    if (!user) return;

    const handleSocketEvents = new Promise((resolve) => {
      socket.on("chat-stream", (message) => {
        resolve(message);
      });
    });

    await Chat.createMessage({
      agent: "user",
      channel: "general-english",
      kind: "text",
      user: Users.getBasicUser(user),
      text: "Message",
    });

    // Join the Chat Feed to receive all Genral English Messages
    socket.emit("chat-join", "general-english");

    //Expect initial Chat Feed
    const message: any = await handleSocketEvents;

    expect(message.type).toBe("initialize");
    expect(message.documents.length).toBeGreaterThanOrEqual(1);
    expect(message.documents[0].agent).toBe("user");
    expect(message.documents[0].channel).toBe("general-english");
    expect(message.documents[0].kind).toBe("text");
    expect(message.documents[0].text).toBe("Message");

    socket.emit("chat-leave", "general-english");
  });

  it("Insert & Update Chat Feed", async () => {
    if (socket == null) return;

    const user = await Database.collection("users").findOne({ username: "chatListener" });

    if (!user) return;
    await Chat.createMessage({
      agent: "user",
      channel: "general-english",
      kind: "text",
      user: Users.getBasicUser(user),
      text: "Initialize Message",
    });
    // Join the Chat Feed to receive all Genral English Messages
    socket.emit("chat-join", "general-english");

    const handleSocketEvents = new Promise((resolve) => {
      socket.on("chat-stream", (message) => {
        resolve(message);
      });
    });

    const message: any = await handleSocketEvents;

    const insertMessageDB = await Chat.createMessage({
      agent: "user",
      channel: "general-english",
      kind: "text",
      user: Users.getBasicUser(user),
      text: "Insert Message",
    });

    const handleInsertEvents = new Promise((resolve) => {
      socket.on("chat-stream", (message) => {
        resolve(message);
      });
    });

    const insertMessage: any = await handleInsertEvents;
    expect(insertMessage.type).toBe("insert");
    expect(insertMessage.document.agent).toBe("user");
    expect(insertMessage.document.channel).toBe("general-english");
    expect(insertMessage.document.kind).toBe("text");
    expect(insertMessage.document.text).toBe("Insert Message");

    const messageDB = await Database.collection("chat-messages").updateOne(
      { _id: insertMessageDB._id },
      { $set: { text: "Updated Message" } },
    );

    const handleUpdateEvents = new Promise((resolve) => {
      socket.on("chat-stream", (message) => {
        resolve(message);
      });
    });

    const updateMessage: any = await handleUpdateEvents;

    expect(updateMessage.type).toBe("update");
    expect(updateMessage.update.documentId).toBe(insertMessageDB._id);
    expect(updateMessage.update.updatedFields.text).toBe("Updated Message");

    socket.emit("chat-leave", "general-english");
  });

  it("Rain Chat Feed", async () => {
    if (socket == null) return;

    const user = await Database.collection("users").findOne({ username: "chatListener" });

    if (!user) return;

    const handleSocketEvents = new Promise((resolve) => {
      socket.on("chat-rain-stream", (message) => {
        resolve(message);
      });
    });

    // Join the Chat Feed to receive all Genral English Messages
    const settings = await Site.settings.cache();
    const interval = Numbers.randomInt(settings.rainMinInterval, settings.rainMaxInterval);

    const duration = settings.rainDuration;
    const baseAmount = Intimal.fromDecimal(settings.rainBaseAmount);
    const startDate = new Date();
    const openDate = addMinutes(startDate, interval - duration);
    const endDate = addMinutes(startDate, interval);

    const rain: ChatRainDocument = {
      _id: Ids.object(),
      startDate,
      openDate,
      endDate,
      interval,
      duration,
      baseAmount,
      taxAmount: 0,
      tipAmount: 0,
      totalAmount: baseAmount,
      ticketCount: 0,
    };
    await Database.collection("chat-rains").insertOne(rain);

    socket.emit("chat-join", "general-english");

    const message: any = await handleSocketEvents;

    expect(message.type).toBe("initialize");
    expect(message.documents[0]._id).toBe(rain._id);

    const handleUpdateRainEvents = new Promise((resolve) => {
      socket.on("chat-rain-stream", (message) => {
        resolve(message);
      });
    });
    const updateRainDB = await Database.collection("chat-rains").updateOne(
      { _id: rain._id },
      { $set: { baseAmount: 2000 } },
    );

    const updateRainMessage: any = await handleUpdateRainEvents;
    expect(updateRainMessage.type).toBe("update");
    expect(updateRainMessage.update.documentId).toBe(rain._id);
    expect(updateRainMessage.update.updatedFields.baseAmount).toBe(2000);

    socket.emit("chat-leave", "general-english");
  });
});
