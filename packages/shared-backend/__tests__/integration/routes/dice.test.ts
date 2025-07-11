// Libraries
import { describe, it, expect, beforeAll, vi } from "vitest";
import bcrypt from "bcrypt";
// Services
import { Database } from "@server/services/database";
import { Dice } from "@server/services/dice";
// Testing + setup utilities
import {
  createTestUser,
  fetchWithCookie,
  findUserOrFailTest,
  handleUserLogin,
} from "../../testUtility";
import config from "#app/config";
// Types
import { UserDocument } from "@core/types/users/UserDocument";
// Consts
const BASE_URL = config.siteAPI;
const hCaptchaToken = "10000000-aaaa-bbbb-cccc-000000000001"; // from hCatcha's integration test guidance
const url = BASE_URL + "/dice/post-ticket";

describe("Test Dice Game Route", () => {
  beforeAll(async () => {
    const passwordHash = await bcrypt.hash("password123", 8);
    const user = createTestUser("tester2", "test2@gmail.com", "user", passwordHash);
    await Database.collection("users").insertOne(user);
  });

  it("Post Dice Ticket", async () => {
    const { user } = await findUserOrFailTest("tester2");
    const { sessionCookie } = await handleUserLoginFunc(user);
    const { getTicketResult, getUserResponse } = await placeWager(sessionCookie, {
      betAmount: 100,
      targetValue: 4,
      targetKind: "under",
    });

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
    const { user } = await findUserOrFailTest("tester2");
    const { sessionCookie } = await handleUserLoginFunc(user);
    const { getTicketResult } = await placeWager(sessionCookie, {
      betAmount: 100,
      targetValue: -1000,
      targetKind: "under",
    });
    expect(getTicketResult["error"]["key"]).toBe("validations.number.min");
    expect(getTicketResult["error"]["value"]["label"]).toBe("targetValue");
    expect(getTicketResult["error"]["value"]["min"]).toBe(0);
  });

  it("Post Bad Target Kind Dice Ticket", async () => {
    const { user } = await findUserOrFailTest("tester2");
    const { sessionCookie } = await handleUserLoginFunc(user);
    const { getTicketResult } = await placeWager(sessionCookie, {
      betAmount: 100,
      targetValue: 4,
      targetKind: "between",
    });
    expect(getTicketResult["error"]).toBe("Invalid target kind.");
  });

  it("Post Bad Bet Amount Dice Ticket", async () => {
    const { user } = await findUserOrFailTest("tester2");
    const { sessionCookie } = await handleUserLoginFunc(user);
    const { getTicketResult } = await placeWager(sessionCookie, {
      betAmount: -100,
      targetValue: 4,
      targetKind: "under",
    });
    // expect(getTicketResult["error"]).toBe("betAmount must be greater than or equal to 0");
    expect(getTicketResult["error"]["key"]).toBe("validations.number.min");
    expect(getTicketResult["error"]["value"]["label"]).toBe("betAmount");
    expect(getTicketResult["error"]["value"]["min"]).toBe(0);
  });

  it("Post Bad Target Amount Dice Ticket (Max)", async () => {
    const { user } = await findUserOrFailTest("tester2");
    const { sessionCookie } = await handleUserLoginFunc(user);
    const { getTicketResult } = await placeWager(sessionCookie, {
      betAmount: 100,
      targetValue: 4000000000000,
      targetKind: "under",
    });
    expect(getTicketResult["error"]).toBe("Target value out of range.");
  });

  it("Post Dice Ticket - Wagers outside of the accepted range should return a handled error", async () => {
    const { user } = await findUserOrFailTest("tester2");
    const { sessionCookie } = await handleUserLoginFunc(user);
    const betAmount = 100;
    const targetKind = "under";
    const range = Dice.getTargetMinMax(targetKind);
    let targetValue = range.max + 1;

    let { getUserResponse, getTicketResult } = await placeWager(sessionCookie, {
      betAmount,
      targetValue,
      targetKind,
    });
    expect(getUserResponse.status).toBe(400);
    expect(getTicketResult["error"]).toEqual("Target value out of range.");

    ({ getUserResponse, getTicketResult } = await placeWager(sessionCookie, {
      betAmount,
      targetValue: range.min - 1,
      targetKind,
    }));

    expect(getUserResponse.status).toBe(400);
    expect(getTicketResult["error"]).toEqual("Target value out of range.");
  });

  it("Post Dice Ticket - Profit excedding max profit should return a handled error", async () => {
    const maxProfit = Dice.maxProfit;
    vi.spyOn(Dice, "getProfit").mockReturnValueOnce(maxProfit + 0.01);
    const { user } = await findUserOrFailTest("tester2");
    const { sessionCookie } = await handleUserLoginFunc(user);

    const betAmount = Dice.maxValue;
    const targetKind = "under";
    const range = Dice.getTargetMinMax(targetKind);
    const targetValue = range.max;

    const { getUserResponse, getTicketResult } = await placeWager(sessionCookie, {
      betAmount,
      targetValue,
      targetKind,
    });

    expect(getUserResponse.status).toBe(400);
    expect(getTicketResult["error"]).toEqual("Exceeds max profit.");
  });
});

// Test helper functions
async function handleUserLoginFunc(user: Pick<UserDocument, "username">) {
  const { sessionResponse, sessionCookie } = await handleUserLogin({
    user,
    siteAPI: config.siteAPI,
    hCaptchaToken,
  });
  return { sessionResponse, sessionCookie };
}

async function placeWager(
  sessionCookie: string,
  wager: {
    betAmount: number;
    targetValue: number;
    targetKind: "over" | "under" | "between";
  },
) {
  const getUserResponse = await fetchWithCookie(url, "POST", wager, sessionCookie);
  const getTicketResult = await getUserResponse.json();
  return {
    getUserResponse,
    getTicketResult,
  };
}
