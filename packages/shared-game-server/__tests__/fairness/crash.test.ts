// Libraries
import { expect, describe, it, beforeEach } from "vitest";
// Crash Setup
import * as Managers from "../../src/managers";
// Services
import { Database } from "@server/services/database";
import { Random } from "@server/services/random";
import { Crash } from "@core/services/crash";
// Testing helpers
import { resetDatabaseConnections } from "../testUtility";
// Types
import { CrashRecordDocument } from "@core/types/crash/CrashRecord";
// Data
import { CRASH_RECORDS } from "./data/crash";

// Consts
const CLIENT_HASH = "0000000000000000000136d4f68307bb4b9f8630e8351b6ab11fc9554cc8bbf8";

describe("Crash Fairness", () => {
  beforeEach(async () => {
    await resetDatabaseConnections([
      "crash-tickets",
      "crash-multipliers",
      "crash-next-tickets",
      "crash-rounds",
    ]);
  });

  it("Confirm crash game multiplier with expected simulated values", async () => {
    await insertCrashRecords([CRASH_RECORDS[0]]); // we will guarantee that it will use this specific record's hash for this test
    Managers.crash();
    await new Promise((resolve) => setTimeout(resolve, 5000));
    const crashRound = await Database.collection("crash-rounds").findOne();
    const multiplier = await Database.collection("crash-multipliers").findOne({
      roundId: crashRound?._id,
    });
    expect(multiplier?.multiplier).toBe(7.46);
    expect(multiplier?.clientHash).toBe(CLIENT_HASH);
    expect(multiplier?.serverHash).toBe(CRASH_RECORDS[0].hash);
  });

  it("Confirm crash game multiplier value dynamically", async () => {
    await insertCrashRecords(CRASH_RECORDS); // we will guarantee that it will use this specific record's hash for this test
    Managers.crash();
    await new Promise((resolve) => setTimeout(resolve, 5000));
    const crashRound = await Database.collection("crash-rounds").findOne();
    const multiplier = await Database.collection("crash-multipliers").findOne({
      roundId: crashRound?._id,
    });
    const calculatedMultiplierValue = Random.getMultiplier({
      serverHash: multiplier?.serverHash ?? "",
      clientHash: CLIENT_HASH,
      maxValue: Crash.maxValue,
    }).valueOf();
    expect(multiplier?.multiplier).toEqual(calculatedMultiplierValue);
    expect(multiplier?.clientHash).toBe(CLIENT_HASH);
  });
}, 15000);

async function insertCrashRecords(records: CrashRecordDocument[]) {
  await Database.collection("crash-records").deleteMany();
  await Database.collection("crash-records").insertMany(records);
}
