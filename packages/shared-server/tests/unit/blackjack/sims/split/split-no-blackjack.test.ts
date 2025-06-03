import { describe, expect, it } from "vitest";
import { getGame } from "../../test-helpers/getGame";
import { mockCardValues } from "../../../../../src/services/blackjack/testing/resetMockCards";
import { userId } from "../../test-helpers/testConfig";

describe("split no blackjack payout", () => {
  it("should work", async () => {
    let syncIndex = 0;
    const game = getGame(20);

    mockCardValues(userId, [10, "K", 10, 8]);
    await game.dealFirstCards();

    mockCardValues(userId, ["A", "J"]);
    await game.action("split", syncIndex++, { userId });

    await game.action("stand", syncIndex++, { userId });

    expect(game.completed).toBe(true);
    expect(game._payoutAmount).toBe(80);
  });
});
