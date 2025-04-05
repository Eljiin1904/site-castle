import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { Database } from "@server/services/database";
import { createTestUser, fetchWithCookie, handleLogin } from "../../testUtility";
import bcrypt from "bcrypt";
import config from "#app/config";
import { Ids } from "@server/services/ids";
import { Random } from "@server/services/random";
import { DoubleRoundDocument } from "@core/types/double/DoubleRoundDocument";
import { Intimal } from "@core/services/intimal";

const BASE_URL = config.siteAPI;
const hCaptchaToken = "10000000-aaaa-bbbb-cccc-000000000001"; // from hCatcha's integration test guidance
let globalSessionCookie: string;

describe("Test Double Game Route", () => {
  beforeAll(async () => {
    const passwordHash = await bcrypt.hash("password123", 8);
    const user = createTestUser(
      "doubleTester",
      "doubleTester@gmail.com",
      "user",
      passwordHash,
      100000,
    );

    const suspendedUser = createTestUser(
      "suspendedDoubleTester",
      "doubleDoubleTester@gmail.com",
      "user",
      passwordHash,
      100000,
      true,
      false,
    );

    const notEmailConfirmedUser = createTestUser(
      "notEmailConfirmedTester",
      "notEmailConfirmedTester@gmail.com",
      "user",
      passwordHash,
      100000,
      false,
      false,
    );

    await Database.collection("site-settings").insertOne({
      _id: "doubleEnabled",
      value: true,
      lastUpdateDate: new Date(),
    });

    await Database.collection("users").insertMany([user, suspendedUser, notEmailConfirmedUser]);
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

  it("Post Double Ticket", async () => {
    const user = await Database.collection("users").findOne({ username: "doubleTester" });
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

    let url = BASE_URL + "/double/post-ticket";
    let createDoubleTicket = await fetchWithCookie(
      url,
      "POST",
      {
        roundId,
        betKind: "green",
        betAmount: 10000,
      },
      globalSessionCookie,
    );
    const getDoubleResult = await createDoubleTicket.json();

    expect(getDoubleResult.user.id).toBe(user._id);
    expect(getDoubleResult.betAmount).toBe(10000);
    expect(getDoubleResult.betKind).toBe("green");
    expect(getDoubleResult.roundId).toBe(roundId);

    const doubleTransaction = await Database.collection("transactions").findOne({
      roundId: getDoubleResult.roundId,
    });

    expect(doubleTransaction?.user.id).toBe(user._id);
    expect(doubleTransaction?.status).toBe("completed");
    expect(doubleTransaction?.category).toBe("double");
    expect(doubleTransaction?.amount).toBe(-10000);
    expect(doubleTransaction?.kind).toBe("double-bet");
  });

  it("Post Bad Bet Amount Double Ticket", async () => {
    const roundId = await Ids.incremental({
      key: "doubleRoundId",
      baseValue: 1000000,
      batchSize: 1,
    });

    let url = BASE_URL + "/double/post-ticket";
    let getDoubleResponse = await fetchWithCookie(
      url,
      "POST",
      {
        roundId,
        betKind: "green",
        betAmount: 100,
      },
      globalSessionCookie,
    );
    const getDoubleResult = await getDoubleResponse.json();
    expect(getDoubleResult["error"].key).toBe("validations.number.moreThan");
    expect(getDoubleResult["error"].value.label).toBe("Bet amount");
    expect(getDoubleResult["error"].value.more).toBe(0);
  });

  it("Post Bad Target Kind Double Ticket", async () => {
    const roundId = await Ids.incremental({
      key: "doubleRoundId",
      baseValue: 1000000,
      batchSize: 1,
    });

    let url = BASE_URL + "/double/post-ticket";
    let getDoubleResponse = await fetchWithCookie(
      url,
      "POST",
      {
        roundId,
        betKind: "yellow",
        betAmount: 100000,
      },
      globalSessionCookie,
    );
    const getDoubleResult = await getDoubleResponse.json();
    expect(getDoubleResult["error"]).toBe("Invalid bet kind.");
  });

  it("Post Bad Round Id Double Ticket", async () => {
    let url = BASE_URL + "/double/post-ticket";
    let getUserResponse = await fetchWithCookie(
      url,
      "POST",
      {
        roundId: undefined,
        betKind: "green",
        betAmount: 100000,
      },
      globalSessionCookie,
    );
    const getTicketResult = await getUserResponse.json();
    expect(getTicketResult["error"]).toBe("Round is required.");
  });

  it("Post Bad Amount Double Ticket (Max) per Bet Kind", async () => {
    const roundId = await Ids.incremental({
      key: "doubleRoundId",
      baseValue: 1000000,
      batchSize: 1,
    });

    let url = BASE_URL + "/double/post-ticket";
    let getUserResponse = await fetchWithCookie(
      url,
      "POST",
      {
        roundId,
        betKind: "green",
        betAmount: Intimal.fromDecimal(2501),
      },
      globalSessionCookie,
    );
    const getGreenTicketResult = await getUserResponse.json();
    expect(getGreenTicketResult["error"]).toBe("The bet amount is greater than the max.");

    getUserResponse = await fetchWithCookie(
      url,
      "POST",
      {
        roundId,
        betKind: "bait",
        betAmount: Intimal.fromDecimal(5001),
      },
      globalSessionCookie,
    );
    const getBaitTicketResult = await getUserResponse.json();
    expect(getBaitTicketResult["error"]).toBe("The bet amount is greater than the max.");

    getUserResponse = await fetchWithCookie(
      url,
      "POST",
      {
        roundId,
        betKind: "red",
        betAmount: Intimal.fromDecimal(10001),
      },
      globalSessionCookie,
    );
    const getRedTicketResult = await getUserResponse.json();
    expect(getRedTicketResult["error"]).toBe("The bet amount is greater than the max.");

    getUserResponse = await fetchWithCookie(
      url,
      "POST",
      {
        roundId,
        betKind: "black",
        betAmount: Intimal.fromDecimal(10001),
      },
      globalSessionCookie,
    );
    const getBlackTicketResult = await getUserResponse.json();
    expect(getBlackTicketResult["error"]).toBe("The bet amount is greater than the max.");
  });

  it("Invalid Double Ticket - Not Enough Funds", async () => {
    const roundId = await Ids.incremental({
      key: "doubleRoundId",
      baseValue: 1000000,
      batchSize: 1,
    });

    let url = BASE_URL + "/double/post-ticket";
    let getUserResponse = await fetchWithCookie(
      url,
      "POST",
      {
        roundId: roundId,
        betKind: "green",
        betAmount: 5000000,
      },
      globalSessionCookie,
    );
    const getTicketResult = await getUserResponse.json();
    expect(getTicketResult["error"]).toBe("You do not have enough tokens.");
  });

  it("Invalid Double Ticket - Suspended User", async () => {
    const user = await Database.collection("users").findOne({ username: "suspendedDoubleTester" });
    if (!user) return;
    const roundId = await Ids.incremental({
      key: "doubleRoundId",
      baseValue: 1000000,
      batchSize: 1,
    });
    const [sessionResponse, sessionCookie] = await handleLogin(
      config.siteAPI,
      {
        username: user.username,
        password: "password123",
      },
      hCaptchaToken,
    );

    let url = BASE_URL + "/double/post-ticket";
    let getUserResponse = await fetchWithCookie(
      url,
      "POST",
      {
        roundId: roundId,
        betKind: "green",
        betAmount: 50000,
      },
      sessionCookie,
    );
    const getTicketResult = await getUserResponse.json();
    expect(getTicketResult["error"]).toBe("Email must be confirmed.");
  });

  it("Invalid Double Ticket - Not Email Confirmed User", async () => {
    const user = await Database.collection("users").findOne({
      username: "notEmailConfirmedTester",
    });
    if (!user) return;

    const roundId = await Ids.incremental({
      key: "doubleRoundId",
      baseValue: 1000000,
      batchSize: 1,
    });

    const [sessionResponse, sessionCookie] = await handleLogin(
      config.siteAPI,
      {
        username: user.username,
        password: "password123",
      },
      hCaptchaToken,
    );

    let url = BASE_URL + "/double/post-ticket";
    let getUserResponse = await fetchWithCookie(
      url,
      "POST",
      {
        roundId: roundId,
        betKind: "green",
        betAmount: 50000,
      },
      sessionCookie,
    );
    const getTicketResult = await getUserResponse.json();
    expect(getTicketResult["error"]).toBe("Email must be confirmed.");
  });
});
