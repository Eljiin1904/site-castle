import { describe, it, expect, beforeAll, beforeEach } from "vitest";
import { Database } from "@server/services/database";
import { createTestUser, fetchWithCookie, handleLogin } from "../../testUtility";
import bcrypt from "bcrypt";
import config from "#app/config";
import { Limbo } from "@server/services/limbo";

const BASE_URL = config.siteAPI;
const hCaptchaToken = "10000000-aaaa-bbbb-cccc-000000000001"; // from hCatcha's integration test guidance
let globalSessionCookie: string;

describe("Test Limbo Game Route", () => {
  beforeAll(async () => {
    const passwordHash = await bcrypt.hash("password123", 8);
    const user = createTestUser("limboTester", "limboTest@gmail.com", "user", passwordHash, 100000);

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

  it("Create Limbo Game", async () => {
    const user = await Database.collection("users").findOne({ username: "limboTester" });
    if (!user) return;
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

    const getLimboResponse = await getLimbo.json();

    expect(getLimbo.status).toBe(200);
    expect(getLimboResponse.ticket.betAmount).toBe(500);
    expect(getLimboResponse.ticket.targetValue).toBe(range.min);
    expect(getLimboResponse.ticket.user.id).toBe(user._id);
    expect(getLimboResponse.ticket.won).toBeOneOf([true, false]);
    expect(getLimboResponse.ticket.wonAmount).toBeDefined();

    const limboTicket = await Database.collection("limbo-tickets").findOne({
      "user.id": user._id,
    });

    expect(limboTicket?.betAmount).toBe(500);
    expect(limboTicket?.targetValue).toBe(range.min);
    expect(limboTicket?.user.id).toBe(user._id);
    expect(limboTicket?.won).toBeOneOf([true, false]);
    expect(limboTicket?.wonAmount).toBeDefined();

    const limboTransaction = await Database.collection("transactions").findOne({
      "user.id": user._id,
      kind: "limbo-bet",
    });

    expect(limboTransaction?.category).toBe("limbo");
    expect(limboTransaction?.tags).toStrictEqual(["bet", "game"]);
    expect(limboTransaction?.value).toBe(500);
    expect(limboTransaction?.kind).toBe("limbo-bet");
    expect(limboTransaction?.status).toBe("completed");
    expect(limboTransaction?.amount).toBe(-500);
    expect(limboTransaction?.user.id).toBe(user._id);
  });

  it("Create Bad Limbo : Bad Bet Amount", async () => {
    const user = await Database.collection("users").findOne({ username: "limboTester" });
    if (!user) return;
    const range = Limbo.getTargetMinMax();
    let url = BASE_URL + "/limbo/post-ticket";
    let getLimbo = await fetchWithCookie(
      url,
      "POST",
      {
        betAmount: -1,
        targetValue: range.min,
      },
      globalSessionCookie,
    );

    const getLimboResponse = await getLimbo.json();

    expect(getLimbo.status).toBe(500);
    expect(getLimboResponse["error"]["key"]).toBe("validations.number.min");
    expect(getLimboResponse["error"]["value"]["label"]).toBe("betAmount");
    expect(getLimboResponse["error"]["value"]["min"]).toBe(0);
  });

  it("Create Bad Limbo : Bad Bet Amount", async () => {
    const user = await Database.collection("users").findOne({ username: "limboTester" });
    if (!user) return;
    const range = Limbo.getTargetMinMax();
    let url = BASE_URL + "/limbo/post-ticket";
    let getLimbo = await fetchWithCookie(
      url,
      "POST",
      {
        betAmount: -1,
        targetValue: range.min,
      },
      globalSessionCookie,
    );

    const getLimboResponse = await getLimbo.json();

    expect(getLimbo.status).toBe(500);
    expect(getLimboResponse["error"]["key"]).toBe("validations.number.min");
    expect(getLimboResponse["error"]["value"]["label"]).toBe("betAmount");
    expect(getLimboResponse["error"]["value"]["min"]).toBe(0);
  });

  it("Create Bad Limbo : Bad Target Value (Below Min)", async () => {
    const user = await Database.collection("users").findOne({ username: "limboTester" });
    if (!user) return;
    const range = Limbo.getTargetMinMax();
    let url = BASE_URL + "/limbo/post-ticket";
    let getLimbo = await fetchWithCookie(
      url,
      "POST",
      {
        betAmount: 500,
        targetValue: range.min - 1,
      },
      globalSessionCookie,
    );

    const getLimboResponse = await getLimbo.json();

    expect(getLimbo.status).toBe(400);
    expect(getLimboResponse.error).toBe("Target value out of range.");
  });

  it("Create Bad Limbo : Bad Target Value (Beyond Max)", async () => {
    const user = await Database.collection("users").findOne({ username: "limboTester" });
    if (!user) return;
    const range = Limbo.getTargetMinMax();
    let url = BASE_URL + "/limbo/post-ticket";
    let getLimbo = await fetchWithCookie(
      url,
      "POST",
      {
        betAmount: 500,
        targetValue: range.max + 1,
      },
      globalSessionCookie,
    );

    const getLimboResponse = await getLimbo.json();

    expect(getLimbo.status).toBe(400);
    expect(getLimboResponse.error).toBe("Target value out of range.");
  });
});
