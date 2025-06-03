import { describe, expect, it } from "vitest";
import { getGame } from "../../test-helpers/getGame";
import { mockCardValues } from "../../../../../src/services/blackjack/testing/resetMockCards";
import { userId } from "../../test-helpers/testConfig";

describe("split nat 21", () => {
  it("should work", async () => {
    let syncIndex = 0;
    const game = getGame(20);

    mockCardValues(userId, [5, "K", 5, 8]);
    await game.dealFirstCards();

    mockCardValues(userId, [5, 6]);
    await game.action("split", syncIndex++, { userId });

    mockCardValues(userId, ["A"]); // should end
    await game.action("hit", syncIndex++, { userId });

    mockCardValues(userId, ["K"]); // should end
    await game.action("hit", syncIndex++, { userId });

    expect(game.completed).toBe(true);
    expect(game._payoutAmount).toBe(80);
  });
});
