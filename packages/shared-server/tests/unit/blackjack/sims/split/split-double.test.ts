import { describe, expect, it } from "vitest";
import { getGame } from "../../test-helpers/getGame";
import { mockCardValues } from "../../../../../src/services/blackjack/testing/resetMockCards";
import { userId } from "../../test-helpers/testConfig";

describe("split double test", () => {
  it("should work", async () => {
    let syncIndex = 0;
    const game = getGame(20);

    mockCardValues(userId, [5, "K", 5, 4]);
    await game.dealFirstCards();

    expect(game.completed).toBe(false);

    mockCardValues(userId, [5, 6]);
    await game.action("split", syncIndex++, { userId });

    expect(game.completed).toBe(false);

    mockCardValues(userId, [8]);
    await game.action("double", syncIndex++, { userId });

    expect(game.completed).toBe(false);

    mockCardValues(userId, [4, 3]); // dealer 3
    await game.action("double", syncIndex++, { userId });

    expect(game.completed).toBe(true);
    expect(game._payoutAmount).toBe(80);
  });
});
