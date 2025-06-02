import { describe, expect, test } from "vitest";

describe("sandbox", () => {
  test("should work", () => {
    expect([1, 2]).toEqual([1, 2]);
  });
});
