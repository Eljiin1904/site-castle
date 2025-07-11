import { describe, it, expect, beforeAll, beforeEach } from "vitest";
// Libraries
import bcrypt from "bcrypt";
// Services
import { Database } from "@server/services/database";
import { Game, getCards } from "@server/services/blackjack/Blackjack";
import { Random } from "@server/services/random";
// Testing suite setup
import config from "#app/config";
import {
  createBlackjackGame,
  performBlackjackAction,
  resolveBlackjackSimulationValues,
  lookupBlackjackGame,
  createTestUser,
  findUserOrFailTest,
  handleUserLogin,
  resetDatabaseConnections,
} from "../testUtility";
import { getRandomCardIndex } from "@server/services/blackjack/utils/getRandomCardIndex";

const BASE_URL = config.siteAPI;
const hCaptchaToken = "10000000-aaaa-bbbb-cccc-000000000001"; // from hCatcha's integration test guidance
let globalSessionCookie: string;

// Consts
const URL = BASE_URL + "/blackjack/create-game";
const ACTION_URL = BASE_URL + "/blackjack/submit-action";

const getBaseWager = () => ({
  "lucky-ladies": 0,
  "blackjack-15x": 0,
  "21+3": 0,
  "perfect-pairs": 0,
  "main-bet": 0,
});

describe("Blackjack Fairness", () => {
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
    await resetDatabaseConnections(["blackjack-events", "blackjack-games", "blackjack-tickets"]);
  });

  it("Create Blackjack Game - Confirm random cards can be replicated with seeds & nonces", async () => {
    const { user } = await findUserOrFailTest("blackJackTester");
    const timestamp = Date.now();
    const exisingGames = await Database.collection("blackjack-games").find({}).toArray();
    if (+exisingGames.length) {
      expect.fail();
    }

    const betAmounts = getBaseWager();
    const { getManualBlackjack } = await createBlackjackGame(URL, globalSessionCookie, betAmounts);
    const findGameInDb = await Database.collection("blackjack-games").findOne({
      players: {
        $elemMatch: {
          userId: user._id,
        },
      },
    });

    if (!findGameInDb || findGameInDb.timestamp.getTime() < timestamp) {
      expect.fail();
    }

    const { seeds } = findGameInDb;
    const { serverSeed, clientSeed, nonce } = seeds;

    const expectedCards = {
      dealer: findGameInDb.dealer.hands?.[0]?.cards,
      player:
        findGameInDb.players.find((player) => player.userId === user._id)?.hands?.[0]?.cards ?? [],
    };

    const gameCreationSimulationWithSeeds = new Game(
      {
        _id: "123",
        players: [{ userId: user._id, betAmounts }],
        seeds: {
          serverSeed,
          serverSeedHashed: Random.hashServerSeed(serverSeed),
          clientSeed,
          nonce,
        },
      },
      {
        getRandomCardIndex,
      },
    );
    await gameCreationSimulationWithSeeds.dealFirstCards();
    const simulationValues = resolveBlackjackSimulationValues(
      gameCreationSimulationWithSeeds,
      user._id,
    );
    expect(getManualBlackjack.status).toBe(200);

    ["dealer", "player"].forEach((key) => {
      const simulation = simulationValues[key as "dealer" | "player"];
      const expected = expectedCards[key as "dealer" | "player"];
      expect(simulation.length).toEqual(expected.length);
      simulation.forEach(({ suit, value }, index) => {
        expect(suit).toEqual(expected[index]["suit"]);
        expect(value).toEqual(expected[index]["value"]);
      });
    });
  });

  it("Simulate Blackjack Game creation with pre-defined seeds & nonces to verify expected result", async () => {
    const seeds = {
      step: 4,
      serverSeed: "265c806e14ed9413ad76ddab3ee9a3dc",
      clientSeed: "TCRVOCAKAWEO",
      nonce: 33,
    };
    const { serverSeed, clientSeed, nonce } = seeds;
    const { user } = await findUserOrFailTest("blackJackTester");

    const gameCreationSimulationWithSeeds = new Game(
      {
        _id: "123",
        players: [{ userId: user._id, betAmounts: getBaseWager() }],
        seeds: {
          serverSeed,
          serverSeedHashed: Random.hashServerSeed(serverSeed),
          clientSeed,
          nonce,
        },
      },
      {
        getRandomCardIndex,
      },
    );
    await gameCreationSimulationWithSeeds.dealFirstCards();
    const simulationValues = resolveBlackjackSimulationValues(
      gameCreationSimulationWithSeeds,
      user._id,
    );
    expect(simulationValues.player).toEqual([
      {
        suit: "diamonds",
        value: 2,
      },
      {
        suit: "diamonds",
        value: 7,
      },
    ]);
    expect(simulationValues.dealer).toEqual([
      {
        suit: "spades",
        value: "J",
      },
      {
        suit: "diamonds",
        value: "Q",
      },
    ]);
  });

  it("Create Blackjack Game - Confirm random cards & card hit can be replicated with seeds & nonces", async () => {
    const { user } = await findUserOrFailTest("blackJackTester");
    const timestamp = Date.now();
    const exisingGames = await Database.collection("blackjack-games").find({}).toArray();
    if (+exisingGames.length) {
      expect.fail();
    }

    const betAmounts = getBaseWager();
    const { getManualBlackjack } = await createBlackjackGame(URL, globalSessionCookie, betAmounts);
    let findGameInDb = await lookupBlackjackGame(user._id);
    if (!findGameInDb || findGameInDb.timestamp.getTime() < timestamp) {
      expect.fail();
    }

    const { seeds } = findGameInDb;
    const { serverSeed, clientSeed, nonce, step } = seeds;

    const expectedCards = {
      dealer: findGameInDb.dealer.hands?.[0]?.cards,
      player:
        findGameInDb.players.find((player) => player.userId === user._id)?.hands?.[0]?.cards ?? [],
    };

    const gameCreationSimulationWithSeeds = new Game(
      {
        _id: "123",
        players: [{ userId: user._id, betAmounts }],
        seeds: {
          serverSeed,
          serverSeedHashed: Random.hashServerSeed(serverSeed),
          clientSeed,
          nonce,
        },
      },
      {
        getRandomCardIndex,
      },
    );
    await gameCreationSimulationWithSeeds.dealFirstCards();
    const simulationValues = resolveBlackjackSimulationValues(
      gameCreationSimulationWithSeeds,
      user._id,
    );
    expect(getManualBlackjack.status).toBe(200);

    // Guarantee that the dealer and player have the expected calculated values given the seeds & nonces
    ["dealer", "player"].forEach((key) => {
      const simulation = simulationValues[key as "dealer" | "player"];
      const expected = expectedCards[key as "dealer" | "player"];
      expect(simulation.length).toEqual(expected.length);
      simulation.forEach(({ suit, value }, index) => {
        expect(suit).toEqual(expected[index]["suit"]);
        expect(value).toEqual(expected[index]["value"]);
      });
    });

    if (findGameInDb.completed) {
      return;
    }

    // Request a new card from the dealer
    await performBlackjackAction(ACTION_URL, globalSessionCookie, {
      syncIndex: 0,
      action: "hit",
      gameId: findGameInDb._id,
    });
    await new Promise((resolve) => setTimeout(resolve, 1000));

    findGameInDb = await lookupBlackjackGame(user._id, findGameInDb._id);
    if (!findGameInDb || findGameInDb.timestamp.getTime() < timestamp) {
      expect.fail();
    }

    const newCardsForPlayer =
      findGameInDb.players.find((player) => player.userId === user._id)?.hands?.[0]?.cards ?? [];

    const index = getRandomCardIndex({ serverSeed, clientSeed, nonce, step });
    const cardAtIndex = getCards()[index];

    expect(newCardsForPlayer).toEqual([...simulationValues.player, cardAtIndex]);
  });
});
