import { describe, it, expect } from "vitest";
import { getGame } from "../../test-helpers/getGame";
import { mockCardValues } from "../../../../../src/services/blackjack/testing/resetMockCards";
import { userId } from "../../test-helpers/testConfig";

describe("Insurance", () => {
  it("insurance bought, dealer blackjack", async () => {
    let syncIndex = 0;
    const game = getGame(20);

    mockCardValues(userId, ["K", "A", 7, 10]);
    await game.dealFirstCards();

    expect(game.completed, "game should not be complete").toBe(false);

    await expect(() =>
      game.action("stand", syncIndex, { userId }),
    ).rejects.toThrow();

    await game.action("insurance", syncIndex++, { userId, buyInsurance: true });

    expect(game.completed, "game should complete").toBe(true);

    expect(game._payoutAmount, "insurance payoff - payout amount").toBe(0);
    expect(game._insurancePayout, "insurance payout").toBe(30);
  });
});
