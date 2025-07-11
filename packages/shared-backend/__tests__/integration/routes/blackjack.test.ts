import { describe, it, expect, beforeAll, beforeEach } from "vitest";
import { Database } from "@server/services/database";
import {
  createBlackjackGame,
  createTestUser,
  fetchWithCookie,
  findUserOrFailTest,
  handleUserLogin,
  resetDatabaseConnections,
} from "../../testUtility";
import bcrypt from "bcrypt";
import config from "#app/config";

const BASE_URL = config.siteAPI;
const hCaptchaToken = "10000000-aaaa-bbbb-cccc-000000000001"; // from hCatcha's integration test guidance
let globalSessionCookie: string;

// Consts
const url = BASE_URL + "/blackjack/create-game";

describe("Test Blackjack Game Route", () => {
  beforeAll(async () => {
    const passwordHash = await bcrypt.hash("password123", 8);
    const user = createTestUser(
      "blackJackTester",
      "blackJackTest@gmail.com",
      "user",
      passwordHash,
      100000,
    );
    await Database.collection("users").insertOne(user);
    const { sessionCookie } = await handleUserLogin({
      user,
      hCaptchaToken,
      siteAPI: config.siteAPI,
    });
    globalSessionCookie = sessionCookie;
  });

  beforeEach(async () => {
    // await resetDatabaseConnections(["mines-games"]);
  });

  // it("Create Blackjack Game", async () => {
  //   await findUserOrFailTest("blackJackTester");
  //   const { getManualBlackjack, getBlackjackState } = await createBlackjackGame(
  //     globalSessionCookie,
  //     {
  //       "lucky-ladies": 0,
  //       "blackjack-15x": 0,
  //       "21+3": 0,
  //       "perfect-pairs": 0,
  //       "main-bet": 5,
  //     },
  //   );
  //   expect(getManualBlackjack.status).toBe(500);
  //   expect(getBlackjackState["error"]["key"]).toBe("validations.number.min");
  //   expect(getBlackjackState["error"]["value"]["label"]).toBe("mineCount");
  //   expect(getBlackjackState["error"]["value"]["min"]).toBe(1);
  // });

  it("Create Bad Blackjack Game: Main Bet", async () => {
    await findUserOrFailTest("blackJackTester");
    const { getManualBlackjack, getBlackjackState } = await createBlackjackGame(
      url,
      globalSessionCookie,
      {
        "lucky-ladies": 0,
        "blackjack-15x": 0,
        "21+3": 0,
        "perfect-pairs": 0,
        "main-bet": -1,
      },
    );
    expect(getManualBlackjack.status).toBe(500);
    expect(getBlackjackState["error"]).toBe("negative bet amount for main-bet");
  });

  it("Create Bad Blackjack Game: Lucky Bet", async () => {
    await findUserOrFailTest("blackJackTester");
    const { getManualBlackjack, getBlackjackState } = await createBlackjackGame(
      url,
      globalSessionCookie,
      {
        "lucky-ladies": -1,
        "blackjack-15x": 0,
        "21+3": 0,
        "perfect-pairs": 0,
        "main-bet": 0,
      },
    );
    expect(getManualBlackjack.status).toBe(500);
    expect(getBlackjackState["error"]).toBe("negative bet amount for lucky-ladies");
  });

  it("Create Bad Blackjack Game: Perfect Pairs", async () => {
    await findUserOrFailTest("blackJackTester");
    const { getManualBlackjack, getBlackjackState } = await createBlackjackGame(
      url,
      globalSessionCookie,
      {
        "lucky-ladies": 0,
        "blackjack-15x": 0,
        "21+3": 0,
        "perfect-pairs": -1,
        "main-bet": 0,
      },
    );
    expect(getManualBlackjack.status).toBe(500);
    expect(getBlackjackState["error"]).toBe("negative bet amount for perfect-pairs");
  });

  it("Create Bad Blackjack Game: Blacjack 15x", async () => {
    await findUserOrFailTest("blackJackTester");
    const { getManualBlackjack, getBlackjackState } = await createBlackjackGame(
      url,
      globalSessionCookie,
      {
        "lucky-ladies": 0,
        "blackjack-15x": -1,
        "21+3": 0,
        "perfect-pairs": 0,
        "main-bet": 0,
      },
    );
    expect(getManualBlackjack.status).toBe(500);
    expect(getBlackjackState["error"]).toBe("negative bet amount for blackjack-15x");
  });

  it("Create Bad Blackjack Game: 21+3", async () => {
    await findUserOrFailTest("blackJackTester");
    const { getManualBlackjack, getBlackjackState } = await createBlackjackGame(
      url,
      globalSessionCookie,
      {
        "lucky-ladies": 0,
        "blackjack-15x": 0,
        "21+3": -1,
        "perfect-pairs": 0,
        "main-bet": 0,
      },
    );
    expect(getManualBlackjack.status).toBe(500);
    expect(getBlackjackState["error"]).toBe("negative bet amount for 21+3");
  });

  it("Create Blackjack Game ", async () => {
    await resetDatabaseConnections(["blackjack-events", "blackjack-games", "blackjack-tickets"]);
    await findUserOrFailTest("blackJackTester");
    const { getManualBlackjack, getBlackjackState } = await createBlackjackGame(
      url,
      globalSessionCookie,
      {
        "lucky-ladies": 0,
        "blackjack-15x": 0,
        "21+3": 0,
        "perfect-pairs": 0,
        "main-bet": 0,
      },
    );
    const data = getBlackjackState.game;
    expect(getManualBlackjack.status).toBe(200);
    if (data.completed) {
      expect(data.completed).toBe(true);
      expect(data.dealer).toBeDefined();
      expect(data.players).toBeDefined();
    } else {
      expect(data.completed).toBe(false);
      expect(data.dealer).toBeDefined();
      expect(data.players).toBeDefined();
    }
  });

  it("Create Blackjack Game, Get Existing Game ", async () => {
    const { user } = await findUserOrFailTest("blackJackTester");

    const userId = user._id;
    const existingGame = await Database.collection("blackjack-games").findOne({
      completed: false,
      players: {
        $elemMatch: {
          userId,
        },
      },
    });

    if (existingGame) {
      Database.collection("blackjack-games").deleteOne({ _id: existingGame._id });
    }

    const { getManualBlackjack, getBlackjackState } = await createBlackjackGame(
      url,
      globalSessionCookie,
      {
        "lucky-ladies": 0,
        "blackjack-15x": 0,
        "21+3": 0,
        "perfect-pairs": 0,
        "main-bet": 0,
      },
    );

    const data = getBlackjackState.game;
    expect(getManualBlackjack.status).toBe(200);

    if (!data.completed) {
      const url = BASE_URL + "/blackjack/get-existing-game";

      const getManualBlackjack = await fetchWithCookie(url, "GET", {}, globalSessionCookie);
      const _getBlackjackState = await getManualBlackjack.json();

      expect(data.completed).toBe(false);
      expect(data.dealer).toBeDefined();
      expect(data.players).toBeDefined();
    }
  });
});
