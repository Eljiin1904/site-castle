import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { Database } from "@server/services/database";
import { createTestUser, fetchWithCookie, handleLogin } from "../../testUtility";
import bcrypt from "bcrypt";
import config from "#app/config";

const url = config.siteAPI;
const hCaptchaToken = "10000000-aaaa-bbbb-cccc-000000000001"; // from hCatcha's integration test guidance

describe("Test Dice Game Route", () => {
  beforeAll(async () => {
    const passwordHash = await bcrypt.hash("password123", 8);
    const user = createTestUser("tester1", "test1@gmail.com", "user", passwordHash);

    if (await Database.hasCollection("dice-tickets")) {
      Database.collection("dice-tickets").drop();
    }

    // Initialize Server DB
    await Database.createCollection("users", {});
    await Database.createCollection("dice-tickets", {});
    await Database.createCollection("site-bets", {});
    await Database.createCollection("site-activity", {});
    await Database.createCollection("transactions", {});
    await Database.createCollection("site-settings", {});

    await Database.collection("site-settings").insertOne({
      _id: "diceEnabled",
      value: true,
      lastUpdateDate: new Date(),
    });

    await Database.collection("users").insertOne(user);
  });

  const BASE_URL = "http://127.0.0.1:5000";

  it("Post Dice Ticket", async () => {
    const user = await Database.collection("users").findOne({
      role: "user",
    });
    if (!user) return;
    const [sessionResponse, sessionCookie] = await handleLogin(
      config.siteAPI,
      {
        username: user.username,
        password: "password123",
      },
      hCaptchaToken,
    );

    let url = BASE_URL + "/dice/post-ticket";
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
    });

    expect(diceTransaction?.gameId).toBe(getTicketResult.ticket._id);
    expect(diceTransaction?.category).toBe("dice");
    expect(diceTransaction?.value).toBe(100);
    expect(diceTransaction?.kind).toBe("dice-bet");
  });

  it("Post Bad Target Value Dice Ticket", async () => {
    const user = await Database.collection("users").findOne({
      role: "user",
    });
    if (!user) return;
    const [sessionResponse, sessionCookie] = await handleLogin(
      config.siteAPI,
      {
        username: user.username,
        password: "password123",
      },
      hCaptchaToken,
    );

    let url = BASE_URL + "/dice/post-ticket";
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
    expect(getTicketResult["error"]).toBe("targetValue must be greater than or equal to 0");
  });

  it("Post Bad Target Kind Dice Ticket", async () => {
    const user = await Database.collection("users").findOne({
      role: "user",
    });
    if (!user) return;
    const [sessionResponse, sessionCookie] = await handleLogin(
      config.siteAPI,
      {
        username: user.username,
        password: "password123",
      },
      hCaptchaToken,
    );

    let url = BASE_URL + "/dice/post-ticket";
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
    const user = await Database.collection("users").findOne({
      role: "user",
    });
    if (!user) return;
    const [sessionResponse, sessionCookie] = await handleLogin(
      config.siteAPI,
      {
        username: user.username,
        password: "password123",
      },
      hCaptchaToken,
    );

    let url = BASE_URL + "/dice/post-ticket";
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
    expect(getTicketResult["error"]).toBe("betAmount must be greater than or equal to 0");
  });

  it("Post Bad Target Amount Dice Ticket (Max)", async () => {
    const user = await Database.collection("users").findOne({
      role: "user",
    });
    if (!user) return;
    const [sessionResponse, sessionCookie] = await handleLogin(
      config.siteAPI,
      {
        username: user.username,
        password: "password123",
      },
      hCaptchaToken,
    );

    let url = BASE_URL + "/dice/post-ticket";
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
});
