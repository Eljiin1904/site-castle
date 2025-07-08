import { describe, it, expect, beforeAll, beforeEach } from "vitest";
import { Database } from "@server/services/database";
import { createTestUser, fetchWithCookie, handleLogin } from "../../testUtility";
import bcrypt from "bcrypt";
import config from "#app/config";

const BASE_URL = config.siteAPI;
const hCaptchaToken = "10000000-aaaa-bbbb-cccc-000000000001"; // from hCatcha's integration test guidance
let globalSessionCookie: string;

describe("Test Mines Game Route", () => {
  beforeAll(async () => {
    const passwordHash = await bcrypt.hash("password123", 8);
    const user = createTestUser("mineTester", "mineTest@gmail.com", "user", passwordHash, 100000);

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
  beforeEach(async () => {
    if (await Database.hasCollection("mines-games")) {
      await Database.collection("mines-games").drop();
      await Database.createCollection("mines-games", {});
    }
  });
  it("Create Manual Mine", async () => {
    const user = await Database.collection("users").findOne({ username: "mineTester" });
    if (!user) return;

    let url = BASE_URL + "/mines/create-manual-game";
    let getManualMine = await fetchWithCookie(
      url,
      "POST",
      {
        betAmount: 500,
        gridSize: 2,
        mineCount: 1,
      },
      globalSessionCookie,
    );
    const getMineState = await getManualMine.json();

    expect(getManualMine.status).toBe(200);
    expect(getMineState.state.betAmount).toBe(500);
    expect(getMineState.state.gridSize).toBe(2);
    expect(getMineState.state.mineCount).toBe(1);

    const mineTransaction = await Database.collection("transactions").findOne({
      gameId: getMineState.state.gameId,
      kind: "mines-bet",
    });

    expect(mineTransaction?.category).toBe("mines");
    expect(mineTransaction?.value).toBe(500);
    expect(mineTransaction?.kind).toBe("mines-bet");
  });

  it("Create Bad Manual Mine : Bad Bet Amount", async () => {
    const user = await Database.collection("users").findOne({ username: "mineTester" });
    if (!user) return;

    let url = BASE_URL + "/mines/create-manual-game";
    let getManualMine = await fetchWithCookie(
      url,
      "POST",
      {
        betAmount: -1,
        gridSize: 2,
        mineCount: 1,
      },
      globalSessionCookie,
    );
    const getMineState = await getManualMine.json();

    expect(getManualMine.status).toBe(500);
    expect(getMineState["error"]["key"]).toBe("validations.number.min");
    expect(getMineState["error"]["value"]["label"]).toBe("betAmount");
    expect(getMineState["error"]["value"]["min"]).toBe(0);
  });

  it("Create Bad Manual Mine : Bad Grid Size", async () => {
    const user = await Database.collection("users").findOne({ username: "mineTester" });
    if (!user) return;

    let url = BASE_URL + "/mines/create-manual-game";
    let getManualMine = await fetchWithCookie(
      url,
      "POST",
      {
        betAmount: 0,
        gridSize: -1,
        mineCount: 1,
      },
      globalSessionCookie,
    );
    const getMineState = await getManualMine.json();

    expect(getManualMine.status).toBe(500);
    expect(getMineState["error"]).toBe("Invalid grid size.");
  });

  it("Create Bad Manual Mine : Bad Mine Count", async () => {
    const user = await Database.collection("users").findOne({ username: "mineTester" });
    if (!user) return;

    let url = BASE_URL + "/mines/create-manual-game";
    let getManualMine = await fetchWithCookie(
      url,
      "POST",
      {
        betAmount: 0,
        gridSize: 2,
        mineCount: 0,
      },
      globalSessionCookie,
    );
    const getMineState = await getManualMine.json();

    expect(getManualMine.status).toBe(500);
    expect(getMineState["error"]["key"]).toBe("validations.number.min");
    expect(getMineState["error"]["value"]["label"]).toBe("mineCount");
    expect(getMineState["error"]["value"]["min"]).toBe(1);
  });

  // it("Cashout", async () => {
  //   const user = await Database.collection("users").findOne({ username: "mineTester" });
  //   if (!user) return;

  //   let url = BASE_URL + "/mines/create-manual-game";
  //   let getManualMine = await fetchWithCookie(
  //     url,
  //     "POST",
  //     {
  //       betAmount: 500,
  //       gridSize: 2,
  //       mineCount: 1,
  //     },
  //     globalSessionCookie,
  //   );
  //   const getMineState = await getManualMine.json();

  //   url = BASE_URL + "/mines/reveal-tile";
  //   let revealATile = await fetchWithCookie(
  //     url,
  //     "POST",
  //     {
  //       revealIndex: 0,
  //     },
  //     globalSessionCookie,
  //   );

  //   const getRevealTileResponse = await revealATile.json();

  //   url = BASE_URL + "/mines/cashout";
  //   let getCashout = await fetchWithCookie(url, "POST", {}, globalSessionCookie);
  //   const cashOutResponse = await getCashout.json();

  //   expect(getCashout.status).toBe(200);
  //   expect(cashOutResponse.state.betAmount).toBe(500);
  //   expect(cashOutResponse.state.gridSize).toBe(2);
  //   expect(cashOutResponse.state.mineCount).toBe(1);
  //   expect(cashOutResponse.state.reveals).toStrictEqual([0]);
  // });

  // it("Bad Cashout", async () => {
  //   const user = await Database.collection("users").findOne({ username: "mineTester" });
  //   if (!user) return;

  //   let url = BASE_URL + "/mines/cashout";
  //   let getCashout = await fetchWithCookie(url, "POST", {}, globalSessionCookie);
  //   const cashOutResponse = await getCashout.json();

  //   expect(getCashout.status).toBe(400);
  //   expect(cashOutResponse.error).toBe("Game lookup failed.");
  // });

  // it("Bad Reveal Tile", async () => {
  //   const user = await Database.collection("users").findOne({ username: "mineTester" });
  //   if (!user) return;

  //   let url = BASE_URL + "/mines/create-manual-game";
  //   let getManualMine = await fetchWithCookie(
  //     url,
  //     "POST",
  //     {
  //       betAmount: 500,
  //       gridSize: 2,
  //       mineCount: 1,
  //     },
  //     globalSessionCookie,
  //   );
  //   await new Promise((resolve) => setTimeout(resolve, 250));
  //   url = BASE_URL + "/mines/reveal-tile";
  //   let revealATile = await fetchWithCookie(
  //     url,
  //     "POST",
  //     {
  //       revealIndex: -1,
  //     },
  //     globalSessionCookie,
  //   );

  //   const getRevealTileResponse = await revealATile.json();
  //   await new Promise((resolve) => setTimeout(resolve, 250));

  //   expect(revealATile.status).toBe(500);
  //   expect(getRevealTileResponse["error"]["key"]).toBe("validations.number.min");
  //   expect(getRevealTileResponse["error"]["value"]["label"]).toBe("revealIndex");
  //   expect(getRevealTileResponse["error"]["value"]["min"]).toBe(0);
  // });

  // it("Reveal Wrong Tile due to Grid Size", async () => {
  //   const user = await Database.collection("users").findOne({ username: "mineTester" });
  //   if (!user) return;

  //   let url = BASE_URL + "/mines/create-manual-game";
  //   let getManualMine = await fetchWithCookie(
  //     url,
  //     "POST",
  //     {
  //       betAmount: 500,
  //       gridSize: 2,
  //       mineCount: 1,
  //     },
  //     globalSessionCookie,
  //   );
  //   const getMineState = await getManualMine.json();

  //   url = BASE_URL + "/mines/reveal-tile";
  //   let revealATileRequest = await fetchWithCookie(
  //     url,
  //     "POST",
  //     {
  //       revealIndex: 6,
  //     },
  //     globalSessionCookie,
  //   );

  //   const getRevealTileResponse = await revealATileRequest.json();

  //   expect(revealATileRequest.status).toBe(400);
  //   expect(getRevealTileResponse["error"]).toBe("Invalid reveal index.");
  // });

  // it("Create Auto Mine", async () => {
  //   const user = await Database.collection("users").findOne({ username: "mineTester" });
  //   if (!user) return;

  //   let url = BASE_URL + "/mines/create-auto-game";
  //   let getAutoMine = await fetchWithCookie(
  //     url,
  //     "POST",
  //     {
  //       betAmount: 500,
  //       gridSize: 2,
  //       mineCount: 1,
  //       tileIndexes: [1],
  //     },
  //     globalSessionCookie,
  //   );
  //   const getAutoMineState = await getAutoMine.json();

  //   expect(getAutoMine.status).toBe(200);
  //   expect(getAutoMineState.state.betAmount).toBe(500);
  //   expect(getAutoMineState.state.gridSize).toBe(2);
  //   expect(getAutoMineState.state.mineCount).toBe(1);
  //   expect(getAutoMineState.state.completed).toBe(true);
  // });

  it("Create Bad Auto Mine", async () => {
    const user = await Database.collection("users").findOne({ username: "mineTester" });
    if (!user) return;

    let url = BASE_URL + "/mines/create-auto-game";
    let getAutoMine = await fetchWithCookie(
      url,
      "POST",
      {
        betAmount: 500,
        gridSize: 2,
        mineCount: 1,
        tileIndexes: 1,
      },
      globalSessionCookie,
    );
    let getAutoMineState = await getAutoMine.json();

    expect(getAutoMine.status).toBe(500);
    expect(getAutoMineState["error"]).toBe(
      "tileIndexes must be a `array` type, but the final value was: `1`.",
    );

    getAutoMine = await fetchWithCookie(
      url,
      "POST",
      {
        betAmount: 500,
        gridSize: -1,
        mineCount: 1,
        tileIndexes: [1],
      },
      globalSessionCookie,
    );
    getAutoMineState = await getAutoMine.json();

    expect(getAutoMine.status).toBe(500);
    expect(getAutoMineState["error"]).toBe("Invalid grid size.");

    getAutoMine = await fetchWithCookie(
      url,
      "POST",
      {
        betAmount: -1,
        gridSize: 2,
        mineCount: 1,
        tileIndexes: [1],
      },
      globalSessionCookie,
    );
    getAutoMineState = await getAutoMine.json();

    expect(getAutoMine.status).toBe(500);
    expect(getAutoMineState["error"]["key"]).toBe("validations.number.min");
    expect(getAutoMineState["error"]["value"]["label"]).toBe("betAmount");
    expect(getAutoMineState["error"]["value"]["min"]).toBe(0);

    getAutoMine = await fetchWithCookie(
      url,
      "POST",
      {
        betAmount: 500,
        gridSize: 2,
        mineCount: -1,
        tileIndexes: [1],
      },
      globalSessionCookie,
    );
    getAutoMineState = await getAutoMine.json();

    expect(getAutoMine.status).toBe(500);
    expect(getAutoMineState["error"]["key"]).toBe("validations.number.min");
    expect(getAutoMineState["error"]["value"]["label"]).toBe("mineCount");
    expect(getAutoMineState["error"]["value"]["min"]).toBe(1);
  });
});
