import { describe, expect, it } from "vitest";
import { getGame } from "../../test-helpers/getGame";
import { userId } from "../../test-helpers/testConfig";
import { mockCardValues } from "../../../../../src/services/blackjack/testing/resetMockCards";

describe("Blackjack Simulations - Split", () => {
  it("simple", async () => {
    let syncIndex = 0;
    const game = getGame(20);

    mockCardValues(userId, [10, 9, 10, "K"]);
    await game.dealFirstCards();

    mockCardValues(userId, [7, "K"]);
    await game.action("split", syncIndex++, { userId }); // 10+7, K+10

    await game.action("stand", syncIndex++, { userId }); // 10+7 stand
    await game.action("stand", syncIndex++, { userId }); // 10+K stand

    expect(game._payoutAmount, "payout amount").toBe(40);
  });
});
