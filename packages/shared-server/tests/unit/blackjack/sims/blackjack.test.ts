import { describe, it, expect } from "vitest";
import { getGame } from "../test-helpers/getGame";
import { userId } from "../test-helpers/testConfig";
import { mockCardValues } from "../../../../src/services/blackjack/testing/resetMockCards";

describe("Blackjack Simulations - Blackjack", () => {
  it("Player blackjack", async () => {
    let syncIndex = 0;
    const game = getGame(20);

    mockCardValues(userId, ["A", "Q", "K", 5, 2]); // dealer: Q 5 2, player: A K
    await game.dealFirstCards();

    await expect(
      () => game.action("double", syncIndex, { userId }),
      "double action after player blackjack",
    ).rejects.toThrow();
    await expect(
      () => game.action("stand", syncIndex, { userId }),
      "stand action after player blackjack",
    ).rejects.toThrow();
    await expect(
      () => game.action("hit", syncIndex, { userId }),
      "hit action after player blackjack",
    ).rejects.toThrow();
    await expect(
      () => game.action("split", syncIndex, { userId }),
      "split action after player blackjack",
    ).rejects.toThrow();

    expect(game.completed, "game should be complete").toBe(true);
    expect(game._payoutAmount, "payout amount").toBe(50);
  });

  it("Dealer blackjack", async () => {
    let syncIndex = 0;
    const game = getGame(20);

    // A hidden, no insurance
    mockCardValues(userId, [10, "Q", 5, "A"]); // player: 10,5 dealer: 8,K
    await game.dealFirstCards();

    expect(game.completed, "game should be complete").toBe(true);

    await expect(() =>
      game.action("hit", syncIndex, { userId }),
    ).rejects.toThrow();

    expect(game._payoutAmount, "payout amount").toBe(0);
  });
});
