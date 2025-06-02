import { describe, expect, it } from "vitest";
import { getGame } from "../../test-helpers/getGame";
import { mockCardValues } from "../../../../../src/services/blackjack/testing/resetMockCards";
import { userId } from "../../test-helpers/testConfig";

describe("Split", () => {
  it("win both", async () => {
    let syncIndex = 0;
    const game = getGame(20);

    mockCardValues(userId, [8, 5, 8, "K"]); // player: 8,8 dealer: 5,K
    await game.dealFirstCards();

    mockCardValues(userId, [10, 4]); // split 8+10. 8+4
    await game.action("split", syncIndex++, { userId });

    expect(game.completed, "status not complete").toBe(false);

    await game.action("stand", syncIndex++, { userId });
    expect(game.completed, "status not complete x2").toBe(false);

    mockCardValues(userId, [6, 2]); // split 8+10. 8+4+6 dealer: 5 K 2
    await game.action("hit", syncIndex++, { userId }); // 6
    expect(game.completed, "status not complete x4").toBe(false);

    await game.action("stand", syncIndex++, { userId });
    expect(game.completed, "status complete").toBe(true);

    expect(game._payoutAmount, "payout amount").toBe(80);
  });

  it("tie both", async () => {
    let syncIndex = 0;
    const game = getGame(20);

    mockCardValues(userId, [8, 5, 8, "K"]); // player: 8,8 dealer: 5,K
    await game.dealFirstCards();

    mockCardValues(userId, [10, 4]); // split 8+10. 8+4
    await game.action("split", syncIndex++, { userId });

    expect(game.completed, "status not complete").toBe(false);

    await game.action("stand", syncIndex++, { userId });
    expect(game.completed, "status not complete x2").toBe(false);

    mockCardValues(userId, [6, 3]); // split 8+10. 8+4+6 dealer: 5 K 3
    await game.action("hit", syncIndex++, { userId }); // 6
    expect(game.completed, "status not complete x4").toBe(false);

    await game.action("stand", syncIndex++, { userId });
    expect(game.completed, "status complete").toBe(true);

    expect(game._payoutAmount, "payout amount").toBe(40);
  });

  it("lose both", async () => {
    let syncIndex = 0;
    const game = getGame(20);

    mockCardValues(userId, [8, 5, 8, "K"]); // player: 8,8 dealer: 5,K
    await game.dealFirstCards();

    mockCardValues(userId, [10, 4]); // split 8+10. 8+4
    await game.action("split", syncIndex++, { userId });

    expect(game.completed, "status not complete").toBe(false);

    await game.action("stand", syncIndex++, { userId });
    expect(game.completed, "status not complete x2").toBe(false);

    mockCardValues(userId, [6, 4]); // split 8+10. 8+4+6 dealer: 5 K 4
    await game.action("hit", syncIndex++, { userId }); // 6
    expect(game.completed, "status not complete x4").toBe(false);

    await game.action("stand", syncIndex++, { userId });
    expect(game.completed, "status complete").toBe(true);

    expect(game._payoutAmount, "payout amount").toBe(0);
  });
});
