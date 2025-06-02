import { describe, it, expect } from "vitest";
import { getGame } from "../../test-helpers/getGame";
import { mockCardValues } from "../../../../../src/services/blackjack/testing/resetMockCards";
import { userId } from "../../test-helpers/testConfig";

describe("Insurance", () => {
  it("insurance bought, no dealer blackjack, player lose", async () => {
    let syncIndex = 0;
    const game = getGame(20);

    mockCardValues(userId, [10, "A", 7, 8]);
    await game.dealFirstCards();

    expect(game.completed, "game should not be complete").toBe(false);

    await expect(() =>
      game.action("double", syncIndex, { userId }),
    ).rejects.toThrow();
    await expect(() =>
      game.action("split", syncIndex, { userId }),
    ).rejects.toThrow();
    await expect(() =>
      game.action("stand", syncIndex, { userId }),
    ).rejects.toThrow();
    await expect(() =>
      game.action("hit", syncIndex, { userId }),
    ).rejects.toThrow();

    expect(game.completed, "game should not be complete").toBe(false);

    await game.action("insurance", syncIndex++, { userId, buyInsurance: true });

    expect(game.completed, "game should not be complete yet").toBe(false);

    await game.action("stand", syncIndex++, { userId });

    expect(game.completed, "game should be complete").toBe(true);

    expect(game._payoutAmount, "player lost - payout amount").toBe(0);
    expect(game._insurancePayout, "insurance payout").toBe(undefined);
  });
});
