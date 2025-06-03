// dealer A 5
// player 2 2
// split 9 3
// stand, didn't work
// stand, didn't work
// hit 5
// hit 7

import { describe, expect, it } from "vitest";
import { getGame } from "../../test-helpers/getGame";
import { mockCardValues } from "../../../../../src/services/blackjack/testing/resetMockCards";
import { userId } from "../../test-helpers/testConfig";

describe("Blackjack Simulation - Bug Repro", () => {
  it("something with splitting", async () => {
    let syncIndex = 0;
    const game = getGame(20);

    mockCardValues(userId, [2, 5, 2, "K"]);
    await game.dealFirstCards();

    mockCardValues(userId, [9, 3]);
    await game.action("split", syncIndex++, { userId }); // [2, 9], [2, 3]

    mockCardValues(userId, [9]);
    await game.action("hit", syncIndex++, { userId }); // [2, 9, 9], [2, 3]
    await game.action("stand", syncIndex++, { userId }); // [2, 9, 9], [2, 3]

    mockCardValues(userId, [5]);
    await game.action("hit", syncIndex++, { userId }); // [2,9,9], [2,3,5]

    mockCardValues(userId, [6]);
    await game.action("hit", syncIndex++, { userId }); // [2,9,9], [2,3,5,6]

    mockCardValues(userId, [4]); // for dealer => 19
    await game.action("stand", syncIndex++, { userId });

    expect(game.completed, "completed").toBe(true);

    expect(game._payoutAmount, "payout amount").toBe(40);
  });
});
