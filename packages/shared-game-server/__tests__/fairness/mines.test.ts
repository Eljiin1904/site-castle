// Libraries
import { expect, describe, it, beforeEach } from "vitest";
// Services
import { Database } from "@server/services/database";
import { Mines } from "@server/services/mines";
import { Random } from "@server/services/random";
// Testing helpers
import { createTestUser, resetDatabaseConnections } from "../testUtility";

describe("Mines Fairness", () => {
  const user = {
    ...createTestUser("mine-fairness-tester", "mine-fairness-tester@pidwin.com"),
    tokenBalance: 1000000,
  };
  const userLocation = {
    ip: "127.0.0.1",
  };

  beforeEach(async () => {
    await Promise.all([
      resetDatabaseConnections(["mines-events", "mines-games"]),
      Database.collection("users").deleteOne({ username: "mine-fairness-tester" }),
    ]);
    await Database.collection("users").insertOne(user);
  });

  it("Create Manual Game and verify mine indices can be regenerated with the same inputs", async () => {
    // User config gor mine game setup
    const MINE_GAME_SETUP: Record<"mineCount" | "gridSize" | "betAmount", number> = {
      mineCount: 5,
      gridSize: 5,
      betAmount: 100,
    };

    // Create & Find then Game as per user set up
    const mineGame = await Mines.createGame({
      user,
      location: userLocation,
      mode: "manual",
      ...MINE_GAME_SETUP,
    });
    const findMineGame = await Database.collection("mines-games").findOne({
      _id: mineGame._id,
    });

    if (!findMineGame) {
      expect.fail();
    }

    // Guarantee that the game was created as per the requirements by user
    expect(Boolean(findMineGame)).toBe(true);
    expect(findMineGame?.betAmount).toEqual(MINE_GAME_SETUP.betAmount);
    expect(findMineGame?.gridSize).toEqual(MINE_GAME_SETUP.gridSize);
    expect(findMineGame?.mineCount).toEqual(MINE_GAME_SETUP.mineCount);

    // Utilize provided seeds and nonce to recalculate mine field indices
    const { serverSeed, clientSeed, nonce } = findMineGame;
    const mineField = await mineGameSetup({
      serverSeed,
      clientSeed,
      nonce,
      gridSize: MINE_GAME_SETUP.gridSize,
      mineCount: MINE_GAME_SETUP.mineCount,
    });

    // Guarantee that there are the correct amount of mines
    expect(mineField.length).toEqual(MINE_GAME_SETUP.mineCount);
    for (const mineIndex of mineField) {
      // Guarantee that no mines have been modified
      expect(findMineGame.mines.includes(mineIndex)).toBe(true);
    }
  });
}, 15000);

type MineGameSetupArgs = {
  serverSeed: string;
  clientSeed: string;
  nonce: number;
  gridSize: number;
  mineCount: number;
};
async function mineGameSetup(args: MineGameSetupArgs) {
  const { serverSeed, clientSeed, nonce, gridSize, mineCount } = args;

  const tileCount = Mines.getTileCount(gridSize);

  const tileIndexes = [...Array(tileCount)].map((x, i) => i);
  const mines = [];

  for (let n = 0; n < mineCount; n++) {
    const rollIndex = Random.getRoll({
      serverSeed,
      clientSeed,
      nonce: `${nonce}-${n}`,
      minValue: 0,
      maxValue: tileIndexes.length,
    });

    const tileIndex = tileIndexes[rollIndex];

    tileIndexes.splice(rollIndex, 1);

    mines.push(tileIndex);
  }

  return mines;
}
