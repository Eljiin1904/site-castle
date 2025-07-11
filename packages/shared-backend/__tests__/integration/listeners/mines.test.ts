import { describe, it, expect, beforeAll, afterAll, beforeEach } from "vitest";
import { Database } from "@server/services/database";
import {
  createTestUser,
  handleLogin,
  fetchWithCookie,
  findUserOrFailTest,
} from "../../testUtility";
import { io, Socket } from "socket.io-client";
import config from "#app/config";
import bcrypt from "bcrypt";
import { Ids } from "@server/services/ids";

let socket: Socket;
const BASE_URL = config.siteAPI;
const CREATE_GAME_URL = BASE_URL + "/mines/create-manual-game";
const REVEAL_TILE_URL = BASE_URL + "/mines/reveal-tile";
const hCaptchaToken = "10000000-aaaa-bbbb-cccc-000000000001"; // from hCatcha's integration test guidance
let globalSessionCookie: string;

const url = config.siteAPI;
async function createSocket() {
  return await io(url, {
    transports: ["websocket"],
  });
}

beforeAll(async () => {
  const passwordHash = await bcrypt.hash("password123", 8);
  const user = createTestUser(
    "minesListenerTester",
    "minesListenerTest@gmail.com",
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

  try {
    socket = await createSocket();
  } catch (err) {
    console.log("Errr " + err);
  }
});

beforeEach(async () => {
  if (await Database.hasCollection("mines-games")) {
    await Database.collection("mines-games").drop();
    await Database.createCollection("mines-games", {});
  }
});
afterAll(() => {
  if (socket) socket.close();
});

describe("Mines Game Test ", async () => {
  it("Join Mines Game Feed", async () => {
    if (socket == null) return;

    const user = await Database.collection("users").findOne({ username: "minesListenerTester" });

    if (!user) return;

    const handleSocketEvents = new Promise((resolve) => {
      socket.on("mines-init", (message) => {
        resolve(message);
      });
    });

    // Join the Bet Feed to receive all Bets
    socket.emit("mines-join", user._id);

    const message: any = await handleSocketEvents;

    expect(message.hasOwnProperty("feed")).toBe(true);
    expect(message.hasOwnProperty("game")).toBe(false);
  });

  it("Test Insert and Leaving Mines Feed", async () => {
    await findUserOrFailTest("minesListenerTester");
    const { getMineState } = await createGame({
      betAmount: 500,
      gridSize: 2,
      mineCount: 1,
    });
    if (socket == null) return;

    const minesGameDB = await Database.collection("mines-games").findOne({
      _id: getMineState.state.gameId,
    });
    const { getRevealTileResponse } = await revealTile(minesGameDB?.mines[0] ?? 0);
    const game = getRevealTileResponse.state;
    await Database.collection("mines-events").insertOne({
      _id: Ids.object(),
      gameId: game.gameId,
      user: game.user,
      gridSize: game.gridSize,
      mineCount: game.mineCount,
      revealCount: game.revealCount,
      won: true,
      wonAmount: 1000,
      multiplier: 0.5,
    });

    // Capture Message for insert
    const handleSocketEvents = new Promise((resolve) => {
      socket.on("mines-insert", (message) => {
        resolve(message);
      });
    });

    const message: any = await handleSocketEvents;

    expect(message.gameId).toBe(game.gameId);
    expect(message.gridSize).toBe(game.gridSize);
    expect(message.mineCount).toBe(game.mineCount);
    expect(message.revealCount).toBe(game.revealCount);
    expect(message.won).toBe(true);
    expect(message.multiplier).toBe(0.5);
    socket.emit("mines-leave");
    const handleInsertSocketEvent = new Promise((resolve, reject) => {
      socket.on("mines-insert", (message) => {
        resolve(message);
      });

      setTimeout(() => {
        reject(new Error("Message not received on insert"));
      }, 1000);
    });

    await expect(handleInsertSocketEvent).rejects.toThrow("Message not received on insert");
  }, 10000);

  it("Test Leaving Mines Feed", async () => {
    await findUserOrFailTest("minesListenerTester");
    const { getMineState } = await createGame({
      betAmount: 500,
      gridSize: 2,
      mineCount: 1,
    });

    if (socket == null) return;

    const minesGameDB = await Database.collection("mines-games").findOne({
      _id: getMineState.state.gameId,
    });

    const { getRevealTileResponse } = await revealTile(minesGameDB?.mines[0] ?? 0);
    socket.emit("mines-leave");

    const game = getRevealTileResponse.state;
    await Database.collection("mines-events").insertOne({
      _id: Ids.object(),
      gameId: game.gameId,
      user: game.user,
      gridSize: game.gridSize,
      mineCount: game.mineCount,
      revealCount: game.revealCount,
      won: true,
      wonAmount: 1000,
      multiplier: 0.5,
    });

    const handleInsertSocketEvent = new Promise((resolve, reject) => {
      socket.on("mines-insert", (message) => {
        resolve(message);
      });

      setTimeout(() => {
        reject(new Error("Message not received on insert"));
      }, 1000);
    });

    await expect(handleInsertSocketEvent).rejects.toThrow("Message not received on insert");
  }, 10000);
});

async function createGame(wager: { betAmount: number; gridSize: number; mineCount: number }) {
  const getManualMine = await fetchWithCookie(CREATE_GAME_URL, "POST", wager, globalSessionCookie);
  const getMineState = await getManualMine.json();
  return {
    getManualMine,
    getMineState,
  };
}

async function revealTile(revealIndex: number) {
  const revealATileRequest = await fetchWithCookie(
    REVEAL_TILE_URL,
    "POST",
    {
      revealIndex,
    },
    globalSessionCookie,
  );
  const getRevealTileResponse = await revealATileRequest.json();
  return {
    revealATileRequest,
    getRevealTileResponse,
  };
}
