import { describe, expect, it } from "vitest";
import { userId } from "../test-helpers/testConfig";
import { getGame } from "../test-helpers/getGame";
import { mockCardValues } from "../../../../src/services/blackjack/testing/resetMockCards";

describe("Blackjack Simulations", () => {
  it("DB export test", async () => {
    let syncIndex = 0;
    const game = getGame(0);

    {
      const { completed, dealer, players } = game.getDbObj();
      expect(completed, "completed should be false").toBe(false);
    }

    mockCardValues(userId, ["Q", 8, 5, "K"]);
    await game.dealFirstCards();

    {
      const { completed, dealer, players } = game.getDbObj();
      const playerHand = players[0].hands[0];
      expect(playerHand.cards[0].value, "player first card").toBe("Q");
      expect(playerHand.cards[1].value, "player second card").toBe(5);
      expect(dealer.hands[0].cards[0].value, "dealer first card").toBe(8);
      expect(dealer.hands[0].cards[1].value, "dealer second card").toBe("K");
      expect(completed, "completed should be false").toBe(false);
    }

    mockCardValues(userId, [9]);

    // const fn = () => game.action("hit", { userId });
    // expect(fn).not.toThrowError();
    await game.action("hit", syncIndex++, { userId });

    expect(game.completed, "init - hit - completed").toBe(true);

    {
      const { completed, dealer, players } = game.getDbObj();
      const playerHand = players[0].hands[0];
      const dealerHand = dealer.hands[0];
      expect(playerHand.cards.length, "player cards").toBe(3);
      expect(dealerHand.cards.length, "dealer cards").toBe(2); // won't draw on player bust
      expect(completed, "export after hit").toBe(true);
    }
  });
});
