import { describe, expect, test } from "vitest";
import { getGame } from "../test-helpers/getGame";
import { mockCardValues } from "../../../../src/services/blackjack/testing/resetMockCards";
import { userId } from "../test-helpers/testConfig";

describe("Blackjack Simulations", () => {
  test("Incorrect action order", async () => {
    let syncIndex = 0;
    const game = getGame(20);

    await expect(() =>
      game.action("stand", syncIndex, { userId }),
    ).rejects.toThrowError();

    mockCardValues(userId, [10, 8, 5, "K"]);
    await game.dealFirstCards();

    await expect(
      () => game.action("stand", syncIndex, { userId: "missing" }),
      "incorrect player id",
    ).rejects.toThrow();
    await expect(
      () => game.action("hit", 1, { userId }),
      "wrong syncIndex",
    ).rejects.toThrowError();
    await expect(
      () => game.action("split", syncIndex, { userId }),
      "split when unavail",
    ).rejects.toThrowError();

    // get payout before finished
    const resp = game.getApiResponse();
    expect(resp.game.players[0].mainPayout, "payoutAmount").toBe(null);

    mockCardValues(userId, [10]);
    await game.action("stand", syncIndex++, { userId });

    expect(game.completed, "game.completed").toBe(true);

    await expect(() =>
      game.action("hit", syncIndex + 1, { userId }),
    ).rejects.toThrow();
    await expect(() =>
      game.action("stand", syncIndex + 1, { userId }),
    ).rejects.toThrow();
    await expect(() =>
      game.action("double", syncIndex + 1, { userId }),
    ).rejects.toThrow();
    await expect(() =>
      game.action("split", syncIndex + 1, { userId }),
    ).rejects.toThrow();
  });
});
