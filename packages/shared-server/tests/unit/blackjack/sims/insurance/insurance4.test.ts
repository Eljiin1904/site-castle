import { describe, expect, it } from "vitest";
import { getGame } from "../../test-helpers/getGame";
import { mockCardValues } from "../../../../../src/services/blackjack/testing/resetMockCards";
import { userId } from "../../test-helpers/testConfig";

describe("Insurance", () => {
  it("insurance bought, no blackjack, player win", async () => {
    let syncIndex = 0;
    const game = getGame(20);

    mockCardValues(userId, ["K", "A", 9, 7]);
    await game.dealFirstCards();

    expect(game.completed, "game should not be complete").toBe(false);

    await game.action("insurance", syncIndex++, { userId, buyInsurance: true });

    await game.action("stand", syncIndex++, { userId });

    expect(game._payoutAmount, "insurance bought - won normal amount").toBe(40);
    expect(game._insurancePayout, "insurance bought - won normal amount").toBe(
      undefined,
    );
  });
});
