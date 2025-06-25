import { describe, it, expect, beforeAll, afterAll } from "vitest";

// Functions
import { getTargetMinMax, getMultiplier, getProfit, getWinChance } from "@core/services/dice/Dice";

let originalMaxValue: number;
let originalEdgeRate: number;

describe("getTargetMinMax with overridden constants", () => {
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

  it("Should reflect overridden constants - over", async () => {
    const result = getTargetMinMax("over");

    expect(result.min).toEqual(mockedMaxValue * mockedEdgeRate + 100);
    expect(result.max).toEqual(mockedMaxValue - 1);
  });

  it("Should reflect overridden constants - under", async () => {
    const result = getTargetMinMax("under");
    expect(result.min).toEqual(1);
    expect(result.max).toEqual(mockedMaxValue - (mockedMaxValue * mockedEdgeRate + 100));
  });
});

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
