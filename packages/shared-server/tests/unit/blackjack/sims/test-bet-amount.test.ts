import { describe, expect, it } from "vitest";
import { getGame } from "../test-helpers/getGame";
import { mockCardValues } from "../../../../src/services/blackjack/testing/resetMockCards";
import { userId } from "../test-helpers/testConfig";

describe("Blackjack Simulations", () => {
  it("test bet amount", async () => {
    let syncIndex = 0;
    const game = getGame(20);

    mockCardValues(userId, [10, 6, 5, "K"]);
    await game.dealFirstCards();

    mockCardValues(userId, [10]);
    await game.action("stand", syncIndex++, { userId });

    expect(game.completed, "completed").toBe(true);
    expect(game._payoutAmount, "payout amount").toBe(40);
  });

  it("test bet amount - lose", async () => {
    let syncIndex = 0;
    const game = getGame(20);

    mockCardValues(userId, [10, 9, 8, "K"]);
    await game.dealFirstCards();

    await game.action("stand", syncIndex++, { userId });

    expect(game.completed, "completed").toBe(true);
    expect(game._payoutAmount, "payout amount").toBe(0);
  });

  it("test bet amount - tie", async () => {
    let syncIndex = 0;
    const game = getGame(20);

    mockCardValues(userId, [10, 8, 8, "K"]);
    await game.dealFirstCards();

    await game.action("stand", syncIndex++, { userId });

    expect(game.completed, "completed").toBe(true);
    expect(game._payoutAmount, "payout amount").toBe(20);
  });

  it("test bet amount - double", async () => {
    let syncIndex = 0;
    const betAmount = 20;
    const game = getGame(betAmount);

    mockCardValues(userId, [10, 8, 5, "K"]);
    await game.dealFirstCards();

    mockCardValues(userId, [3]);
    await game.action("double", syncIndex++, { userId });

    expect(game.completed, "completed").toBe(true);
    expect(game._payoutAmount, "payout amount").toBe(betAmount * 2);
  });
});
