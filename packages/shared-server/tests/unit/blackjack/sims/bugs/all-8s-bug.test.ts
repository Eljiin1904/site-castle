import { describe, expect, it } from "vitest";
import { getGame } from "../../test-helpers/getGame";
import { mockCardValues } from "../../../../../src/services/blackjack/testing/resetMockCards";
import { userId } from "../../test-helpers/testConfig";

describe("all 8s causes early complete?", () => {
  it("should work", async () => {
    let syncIndex = 0;
    const game = getGame(20);

    mockCardValues(userId, [8, 8, 8, 8]);
    await game.dealFirstCards();

    expect(game.completed, "game should be completed").toBe(false);
  });
});
