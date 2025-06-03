import { describe, expect, it } from "vitest";
import { getGame } from "../../test-helpers/getGame";
import { mockCardValues } from "../../../../../src/services/blackjack/testing/resetMockCards";
import { userId } from "../../test-helpers/testConfig";

// multiple splits not allowed
describe("Blackjack Simulations - Split", () => {
  it("one split, double, hit, double-win, hit-bust, dealer-hit", async () => {
    let syncIndex = 0;
    const game = getGame(20);

    mockCardValues(userId, [8, 5, 8, "K"]); // player: 8,8 dealer: K,5
    await game.dealFirstCards();

    mockCardValues(userId, [3, 5]);
    await game.action("split", syncIndex++, { userId }); // 8+3, 8+5

    {
      const playerHands = game.players[0].hands;
      expect(playerHands[0].cards[0].value).toBe(8);
      expect(playerHands[0].cards[1].value).toBe(3);
      expect(playerHands[1].cards[0].value).toBe(8);
      expect(playerHands[1].cards[1].value).toBe(5);
    }

    // attempting 2nd split
    await expect(
      () => game.action("split", syncIndex, { userId }),
      "attempting double split",
    ).rejects.toThrow(); // 8+6, 8+K

    mockCardValues(userId, [9]);
    await game.action("double", syncIndex++, { userId }); // hand1: 20

    mockCardValues(userId, ["K", 4]);
    await game.action("hit", syncIndex++, { userId }); // hand2: bust 23, dealer: K 5 4

    expect(game.completed).toBe(true);
    expect(game._payoutAmount, "payout amount").toBe(80); // 1 hand double, 1 hand bust
  });
});
