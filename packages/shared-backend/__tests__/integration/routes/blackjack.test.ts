import { describe, it, expect, beforeAll, beforeEach } from "vitest";
import { Database } from "@server/services/database";
import { createTestUser, fetchWithCookie, handleLogin } from "../../testUtility";
import bcrypt from "bcrypt";
import config from "#app/config";

const BASE_URL = config.siteAPI;
const hCaptchaToken = "10000000-aaaa-bbbb-cccc-000000000001"; // from hCatcha's integration test guidance
let globalSessionCookie: string;

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
    const [sessionResponse, sessionCookie] = await handleLogin(
      config.siteAPI,
      {
        username: user.username,
        password: "password123",
      },
      hCaptchaToken,
    );
    globalSessionCookie = sessionCookie;
  });
  // beforeEach(async () => {
  //   if (await Database.hasCollection("mines-games")) {
  //     await Database.collection("mines-games").drop();
  //     await Database.createCollection("mines-games", {});
  //   }
  // });

  // it("Create Blackjack Game", async () => {
  //   const user = await Database.collection("users").findOne({ username: "blackJackTester" });
  //   if (!user) return;

  //   let url = BASE_URL + "/blackjack/create-game";
  //   let getManualBlackjack = await fetchWithCookie(
  //     url,
  //     "POST",
  //     {
  //       "lucky-ladies": 0,
  //       "blackjack-15x": 0,
  //       "21+3": 0,
  //       "perfect-pairs": 0,
  //       "main-bet": 5,
  //     },
  //     globalSessionCookie,
  //   );
  //   const getBlackjackState = await getManualBlackjack.json();
  //   console.log(getBlackjackState);
  //   // expect(getManualBlackjack.status).toBe(500);
  //   // expect(getBlackjackState["error"]["key"]).toBe("validations.number.min");
  //   // expect(getBlackjackState["error"]["value"]["label"]).toBe("mineCount");
  //   // expect(getBlackjackState["error"]["value"]["min"]).toBe(1);
  // });

  it("Create Bad Blackjack Game: Main Bet", async () => {
    const user = await Database.collection("users").findOne({ username: "blackJackTester" });
    if (!user) return;

    let url = BASE_URL + "/blackjack/create-game";
    let getManualBlackjack = await fetchWithCookie(
      url,
      "POST",
      {
        betAmounts: {
          "lucky-ladies": 0,
          "blackjack-15x": 0,
          "21+3": 0,
          "perfect-pairs": 0,
          "main-bet": -1,
        },
      },
      globalSessionCookie,
    );
    const getBlackjackState = await getManualBlackjack.json();

    expect(getManualBlackjack.status).toBe(500);
    expect(getBlackjackState["error"]).toBe("negative bet amount for main-bet");
  });
  it("Create Bad Blackjack Game: Lucky Bet", async () => {
    const user = await Database.collection("users").findOne({ username: "blackJackTester" });
    if (!user) return;

    let url = BASE_URL + "/blackjack/create-game";
    let getManualBlackjack = await fetchWithCookie(
      url,
      "POST",
      {
        betAmounts: {
          "lucky-ladies": -1,
          "blackjack-15x": 0,
          "21+3": 0,
          "perfect-pairs": 0,
          "main-bet": 0,
        },
      },
      globalSessionCookie,
    );
    const getBlackjackState = await getManualBlackjack.json();

    expect(getManualBlackjack.status).toBe(500);
    expect(getBlackjackState["error"]).toBe("negative bet amount for lucky-ladies");
  });

  it("Create Bad Blackjack Game: Perfect Pairs", async () => {
    const user = await Database.collection("users").findOne({ username: "blackJackTester" });
    if (!user) return;

    let url = BASE_URL + "/blackjack/create-game";
    let getManualBlackjack = await fetchWithCookie(
      url,
      "POST",
      {
        betAmounts: {
          "lucky-ladies": 0,
          "blackjack-15x": 0,
          "21+3": 0,
          "perfect-pairs": -1,
          "main-bet": 0,
        },
      },
      globalSessionCookie,
    );
    const getBlackjackState = await getManualBlackjack.json();

    expect(getManualBlackjack.status).toBe(500);
    expect(getBlackjackState["error"]).toBe("negative bet amount for perfect-pairs");
  });
  it("Create Bad Blackjack Game: Blacjack 15x", async () => {
    const user = await Database.collection("users").findOne({ username: "blackJackTester" });
    if (!user) return;

    let url = BASE_URL + "/blackjack/create-game";
    let getManualBlackjack = await fetchWithCookie(
      url,
      "POST",
      {
        betAmounts: {
          "lucky-ladies": 0,
          "blackjack-15x": -1,
          "21+3": 0,
          "perfect-pairs": 0,
          "main-bet": 0,
        },
      },
      globalSessionCookie,
    );
    const getBlackjackState = await getManualBlackjack.json();

    expect(getManualBlackjack.status).toBe(500);
    expect(getBlackjackState["error"]).toBe("negative bet amount for blackjack-15x");
  });

  it("Create Bad Blackjack Game: 21+3", async () => {
    const user = await Database.collection("users").findOne({ username: "blackJackTester" });
    if (!user) return;

    let url = BASE_URL + "/blackjack/create-game";
    let getManualBlackjack = await fetchWithCookie(
      url,
      "POST",
      {
        betAmounts: {
          "lucky-ladies": 0,
          "blackjack-15x": 0,
          "21+3": -1,
          "perfect-pairs": 0,
          "main-bet": 0,
        },
      },
      globalSessionCookie,
    );
    const getBlackjackState = await getManualBlackjack.json();

    expect(getManualBlackjack.status).toBe(500);
    expect(getBlackjackState["error"]).toBe("negative bet amount for 21+3");
  });

  it("Create Blackjack Game ", async () => {
    const user = await Database.collection("users").findOne({ username: "blackJackTester" });
    if (!user) return;

    let url = BASE_URL + "/blackjack/create-game";
    let getManualBlackjack = await fetchWithCookie(
      url,
      "POST",
      {
        betAmounts: {
          "lucky-ladies": 0,
          "blackjack-15x": 0,
          "21+3": 0,
          "perfect-pairs": 0,
          "main-bet": 0,
        },
      },
      globalSessionCookie,
    );
    const getBlackjackState = await getManualBlackjack.json();
    console.log(getBlackjackState);
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
    const user = await Database.collection("users").findOne({ username: "blackJackTester" });

    if (!user) return;
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
    let url = BASE_URL + "/blackjack/create-game";
    let getManualBlackjack = await fetchWithCookie(
      url,
      "POST",
      {
        betAmounts: {
          "lucky-ladies": 0,
          "blackjack-15x": 0,
          "21+3": 0,
          "perfect-pairs": 0,
          "main-bet": 0,
        },
      },
      globalSessionCookie,
    );
    const getBlackjackState = await getManualBlackjack.json();
    const data = getBlackjackState.game;

    expect(getManualBlackjack.status).toBe(200);
    if (!data.completed) {
      url = BASE_URL + "/blackjack/get-existing-game";
      let getManualBlackjack = await fetchWithCookie(url, "GET", {}, globalSessionCookie);
      const getBlackjackState = await getManualBlackjack.json();

      expect(data.completed).toBe(false);
      expect(data.dealer).toBeDefined();
      expect(data.players).toBeDefined();
    }
  });
});
