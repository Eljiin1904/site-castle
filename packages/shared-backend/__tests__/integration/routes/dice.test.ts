// Libraries
import { describe, it, expect, beforeAll, vi } from "vitest";
import bcrypt from "bcrypt";
import { WithId } from "mongodb";
// Services
import { Database } from "@server/services/database";
import { Dice } from "@server/services/dice";
// Testing + setup utilities
import { createTestUser, fetchWithCookie, handleLogin } from "../../testUtility";
import config from "#app/config";
// Types
import { UserDocument } from "@core/types/users/UserDocument";
// Consts
const BASE_URL = config.siteAPI;
const hCaptchaToken = "10000000-aaaa-bbbb-cccc-000000000001"; // from hCatcha's integration test guidance
const url = BASE_URL + "/dice/post-ticket";
// Test helper functions
const handleUserLogin = async (user: WithId<UserDocument>) => {
  const [sessionResponse, sessionCookie] = await handleLogin(
    config.siteAPI,
    {
      username: user.username,
      password: "password123",
    },
    hCaptchaToken,
  );
  return {
    sessionResponse,
    sessionCookie,
  };
};

describe("Test Dice Game Route", () => {
  beforeAll(async () => {
    const passwordHash = await bcrypt.hash("password123", 8);
    const user = createTestUser("tester2", "test2@gmail.com", "user", passwordHash);

    await Database.collection("users").insertOne(user);
  });

  it("Post Dice Ticket", async () => {
    const user = await Database.collection("users").findOne({ username: "tester2" });
    if (!user) return;
    const { sessionResponse, sessionCookie } = await handleUserLogin(user);
    let getUserResponse = await fetchWithCookie(
      url,
      "POST",
      {
        betAmount: 100,
        targetValue: 4,
        targetKind: "under",
      },
      sessionCookie,
    );
    const getTicketResult = await getUserResponse.json();

    expect(getUserResponse.status).toBe(200);
    expect(getTicketResult.ticket.user.id).toBe(user._id);
    expect(getTicketResult.ticket.betAmount).toBe(100);
    expect(getTicketResult.ticket.targetKind).toBe("under");
    expect(getTicketResult.ticket.targetValue).toBe(4);
    expect(getTicketResult.ticket.wonAmount).greaterThanOrEqual(0);

    const diceTransaction = await Database.collection("transactions").findOne({
      gameId: getTicketResult.ticket._id,
      kind: "dice-bet",
    });

    expect(diceTransaction?.category).toBe("dice");
    expect(diceTransaction?.value).toBe(100);
    expect(diceTransaction?.kind).toBe("dice-bet");
  });

  it("Post Bad Target Value Dice Ticket", async () => {
    const user = await Database.collection("users").findOne({ username: "tester2" });

    if (!user) return;
    const { sessionResponse, sessionCookie } = await handleUserLogin(user);
    let getUserResponse = await fetchWithCookie(
      url,
      "POST",
      {
        betAmount: 100,
        targetValue: -1000,
        targetKind: "under",
      },
      sessionCookie,
    );
    const getTicketResult = await getUserResponse.json();
    expect(getTicketResult["error"]["key"]).toBe("validations.number.min");
    expect(getTicketResult["error"]["value"]["label"]).toBe("targetValue");
    expect(getTicketResult["error"]["value"]["min"]).toBe(0);
  });

  it("Post Bad Target Kind Dice Ticket", async () => {
    const user = await Database.collection("users").findOne({ username: "tester2" });
    if (!user) return;
    const { sessionResponse, sessionCookie } = await handleUserLogin(user);
    let getUserResponse = await fetchWithCookie(
      url,
      "POST",
      {
        betAmount: 100,
        targetValue: 4,
        targetKind: "between",
      },
      sessionCookie,
    );
    const getTicketResult = await getUserResponse.json();
    expect(getTicketResult["error"]).toBe("Invalid target kind.");
  });

  it("Post Bad Bet Amount Dice Ticket", async () => {
    const user = await Database.collection("users").findOne({ username: "tester2" });
    if (!user) return;
    const { sessionResponse, sessionCookie } = await handleUserLogin(user);
    let getUserResponse = await fetchWithCookie(
      url,
      "POST",
      {
        betAmount: -100,
        targetValue: 4,
        targetKind: "under",
      },
      sessionCookie,
    );
    const getTicketResult = await getUserResponse.json();
    // expect(getTicketResult["error"]).toBe("betAmount must be greater than or equal to 0");
    expect(getTicketResult["error"]["key"]).toBe("validations.number.min");
    expect(getTicketResult["error"]["value"]["label"]).toBe("betAmount");
    expect(getTicketResult["error"]["value"]["min"]).toBe(0);
  });

  it("Post Bad Target Amount Dice Ticket (Max)", async () => {
    const user = await Database.collection("users").findOne({ username: "tester2" });
    if (!user) return;
    const { sessionResponse, sessionCookie } = await handleUserLogin(user);
    let getUserResponse = await fetchWithCookie(
      url,
      "POST",
      {
        betAmount: 100,
        targetValue: 4000000000000,
        targetKind: "under",
      },
      sessionCookie,
    );
    const getTicketResult = await getUserResponse.json();
    expect(getTicketResult["error"]).toBe("Target value out of range.");
  });

  it("Post Dice Ticket - Wagers outside of the accepted range should return a handled error", async () => {
    const user = await Database.collection("users").findOne({ username: "tester2" });
    if (!user) return;
    const { sessionResponse, sessionCookie } = await handleUserLogin(user);
    const betAmount = 100;
    const targetKind = "under";
    const range = Dice.getTargetMinMax(targetKind);
    let targetValue = range.max + 1;

    let getUserResponse = await fetchWithCookie(
      url,
      "POST",
      {
        betAmount,
        targetValue,
        targetKind,
      },
      sessionCookie,
    );
    let getTicketResult = await getUserResponse.json();
    expect(getUserResponse.status).toBe(400);
    expect(getTicketResult["error"]).toEqual("Target value out of range.");

    getUserResponse = await fetchWithCookie(
      url,
      "POST",
      {
        betAmount,
        targetValue: range.min - 1,
        targetKind,
      },
      sessionCookie,
    );
    getTicketResult = await getUserResponse.json();
    expect(getUserResponse.status).toBe(400);
    expect(getTicketResult["error"]).toEqual("Target value out of range.");
  });

  it("Post Dice Ticket - Profit excedding max profit should return a handled error", async () => {
    const maxProfit = Dice.maxProfit;
    vi.spyOn(Dice, "getProfit").mockReturnValueOnce(maxProfit + 0.01);
    const user = await Database.collection("users").findOne({ username: "tester2" });
    if (!user) return;
    const { sessionResponse, sessionCookie } = await handleUserLogin(user);
    const betAmount = Dice.maxValue;
    const targetKind = "under";
    const range = Dice.getTargetMinMax(targetKind);
    let targetValue = range.max;

    let getUserResponse = await fetchWithCookie(
      url,
      "POST",
      {
        betAmount,
        targetValue,
        targetKind,
      },
      sessionCookie,
    );
    let getTicketResult = await getUserResponse.json();
    expect(getUserResponse.status).toBe(400);
    expect(getTicketResult["error"]).toEqual("Exceeds max profit.");
  });
});
