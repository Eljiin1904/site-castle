import { describe, expect, it } from "vitest";
import { getGame } from "../../test-helpers/getGame";
import { userId } from "../../test-helpers/testConfig";
import { mockCardValues } from "#server/services/blackjack/testing/resetMockCards";

describe("Blackjack Simulations - Split", () => {
  it("simple", async () => {
    let syncIndex = 0;
    const game = getGame(20);

    mockCardValues(userId, ["A", 9, "A", "K"]);
    await game.dealFirstCards();

    mockCardValues(userId, [5, "K"]);
    await game.action("split", syncIndex++, { userId }); // 10+7, K+10

    expect(game.completed, "game completed").toBe(true);
    expect(game._payoutAmount, "payout amount").toBe(40);
  });
});
