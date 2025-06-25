import { describe, it, expect, beforeAll, afterAll } from "vitest";

// Functions
import {
  getTargetMinMax,
  getMultiplier,
  getProfit,
  getWinChance,
  isWin,
} from "@core/services/dice/Dice";

let originalMaxValue: number;
let originalEdgeRate: number;

describe("Dice util functions with overridden constants", () => {
  const mockedMaxValue = 123456;
  const mockedEdgeRate = 0.1;

  beforeAll(async () => {
    const maxValueModule = await import(
      "../../../../shared-core/src/services/dice/constants/maxValue"
    );
    const edgeRateModule = await import(
      "../../../../shared-core/src/services/dice/constants/edgeRate"
    );

    originalMaxValue = maxValueModule.maxValue;
    originalEdgeRate = edgeRateModule.edgeRate;

    Object.defineProperty(maxValueModule, "maxValue", {
      value: mockedMaxValue,
      writable: true,
    });

    Object.defineProperty(edgeRateModule, "edgeRate", {
      value: mockedEdgeRate,
      writable: true,
    });
  });

  afterAll(async () => {
    const maxValueModule = await import(
      "../../../../shared-core/src/services/dice/constants/maxValue"
    );
    const edgeRateModule = await import(
      "../../../../shared-core/src/services/dice/constants/edgeRate"
    );

    Object.defineProperty(maxValueModule, "maxValue", {
      value: originalMaxValue,
      writable: true,
    });

    Object.defineProperty(edgeRateModule, "edgeRate", {
      value: originalEdgeRate,
      writable: true,
    });
  });

  it("getTargetMinMax reflects overridden constants - over", async () => {
    const result = getTargetMinMax("over");

    expect(result.min).toEqual(mockedMaxValue * mockedEdgeRate + 100);
    expect(result.max).toEqual(mockedMaxValue - 1);
  });

  it("getTargetMinMax reflects overridden constants - under", async () => {
    const result = getTargetMinMax("under");
    expect(result.min).toEqual(1);
    expect(result.max).toEqual(mockedMaxValue - (mockedMaxValue * mockedEdgeRate + 100));
  });

  it("getMultiplier reflects overridden constants - over", async () => {
    const targetValue = 10000;
    const result = getMultiplier({ targetKind: "over", targetValue });
    expect(result).toEqual(
      (mockedMaxValue / (mockedMaxValue - targetValue)) * (1 - mockedEdgeRate),
    );
  });

  it("getMultiplier reflects overridden constants - under", async () => {
    const targetValue = 10000;
    const result = getMultiplier({ targetKind: "under", targetValue });
    expect(result).toEqual((mockedMaxValue / targetValue) * (1 - mockedEdgeRate));
  });

  it("getWinChance should correctly calculate 'over' value using overriden constants", async () => {
    const targetValue = 500;
    const result = getWinChance({ targetKind: "over", targetValue });
    expect(+result).toEqual(
      +Number(((mockedMaxValue - targetValue) / mockedMaxValue) * 100).toFixed(2),
    );
  });

  it("getWinChance should correctly calculate 'under' value using overriden constants", async () => {
    const targetValue = 500;
    const result = getWinChance({ targetKind: "under", targetValue });
    expect(+result).toEqual(+Number((targetValue / mockedMaxValue) * 100).toFixed(2));
  });
});

describe("Dice util functions", () => {
  describe("getTargetMixMax", async () => {
    it("Should return the correct 'over' values", () => {
      const { min, max } = getTargetMinMax("over");
      expect(min).toBe(originalMaxValue * originalEdgeRate + 100);
      expect(max).toBe(originalMaxValue - 1);
    });

    it("Should return the correct 'under' values", () => {
      const { min, max } = getTargetMinMax("under");
      expect(min).toBe(1);
      expect(max).toBe(originalMaxValue - (originalMaxValue * originalEdgeRate + 100));
    });
  });

  describe("getMultiplier", () => {
    const targetValue = 10000;
    it("getMultiplier should correctly calculate 'over' value", async () => {
      const result = getMultiplier({ targetKind: "over", targetValue });
      expect(result).toEqual(
        (originalMaxValue / (originalMaxValue - targetValue)) * (1 - originalEdgeRate),
      );
    });

    it("getMultiplier should correctly calculate 'under' value", async () => {
      const result = getMultiplier({ targetKind: "under", targetValue });
      expect(result).toEqual((originalMaxValue / targetValue) * (1 - originalEdgeRate));
    });
  });

  describe("getWinChance", () => {
    const targetValue = 500;
    it("getWinChance should correctly calculate 'over' value", async () => {
      const result = getWinChance({ targetKind: "over", targetValue });
      expect(+result).toEqual(
        +Number(((originalMaxValue - targetValue) / originalMaxValue) * 100).toFixed(2),
      );
    });

    it("getWinChance should correctly calculate 'under' value", async () => {
      const result = getWinChance({ targetKind: "under", targetValue });
      expect(+result).toEqual(+Number((targetValue / originalMaxValue) * 100).toFixed(2));
    });
  });

  describe("isWin", () => {
    it("Should not be a win when you roll lower than the target and choose wager over", () => {
      const result = isWin({
        targetKind: "over",
        targetValue: 1000,
        rollValue: 500,
      });
      expect(result).toBe(false);
    });

    it("Should be a win when you roll higher than the target and choose wager over", () => {
      const result = isWin({
        targetKind: "over",
        targetValue: 1000,
        rollValue: 1001,
      });
      expect(result).toBe(true);
    });

    it("Should not be a win when you roll exactly the target and choose wager over", () => {
      const result = isWin({
        targetKind: "over",
        targetValue: 1000,
        rollValue: 1000,
      });
      expect(result).toBe(false);
    });

    it("Should be a win when you roll lower than the target value and choose wager under", () => {
      const result = isWin({
        targetKind: "under",
        targetValue: 1000,
        rollValue: 500,
      });
      expect(result).toBe(true);
    });

    it("Should not be a win when you roll higher than the target and choose wager under", () => {
      const result = isWin({
        targetKind: "under",
        targetValue: 1000,
        rollValue: 1001,
      });
      expect(result).toBe(false);
    });

    it("Should not be a win when you roll exactly the target and choose wager under", () => {
      const result = isWin({
        targetKind: "under",
        targetValue: 1000,
        rollValue: 1000,
      });
      expect(result).toBe(false);
    });
  });

  describe("getProfit", () => {
    it("Should correctly profit for various combinations of over/under wagers");
    let targetKind = "over" as "over" | "under";
    const targetValue = 1000;
    const betAmount = 100;
    let result = getProfit({
      targetKind,
      targetValue,
      betAmount,
    });
    let multiplier = getMultiplier({ targetKind, targetValue });
    expect(result).toBe(Math.round(betAmount * multiplier - betAmount));

    targetKind = "under";
    result = getProfit({
      targetKind,
      targetValue,
      betAmount,
    });
    multiplier = getMultiplier({ targetKind, targetValue });
    expect(result).toBe(Math.round(betAmount * multiplier - betAmount));
  });
});
