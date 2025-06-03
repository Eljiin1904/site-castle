import { describe, expect, it } from "vitest";
import { getGame } from "../test-helpers/getGame";
import { mockCardValues } from "../../../../src/services/blackjack/testing/resetMockCards";
import { userId } from "../test-helpers/testConfig";

describe("player shouldn't be able to hit 21", () => {
  it("should work", async () => {
    let syncIndex = 0;
    const game = getGame(20);

    mockCardValues(userId, [10, "K", 7, 8]);
    await game.dealFirstCards();

    mockCardValues(userId, [2]);
    await game.action("hit", syncIndex++, { userId });

    mockCardValues(userId, [2]);
    await game.action("hit", syncIndex++, { userId });

    expect(game.completed, "game should be completed").toBe(true);
  });
});
