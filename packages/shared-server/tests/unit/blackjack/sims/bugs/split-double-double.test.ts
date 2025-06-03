import { describe, expect, it } from "vitest";
import { mockCardValues } from "../../../../../src/services/blackjack/testing/resetMockCards";
import blackjackGame1 from "./data-copies/blackjackGame1";
import { getRandomCardIndex } from "../../test-helpers/getRandomCardIndex";
import { BlackjackGameDocument } from "#core/types/blackjack/BlackjackGameDocument";
import { Game } from "#server/services/blackjack/models/Game";

describe("bug: split double double", () => {
  it("should work", async () => {
    let syncIndex = 2;
    const userId = "9RHOVLH11M9IGGHLTY";
    // @ts-ignore doesn't like mongo timestamps
    const data = blackjackGame1 as BlackjackGameDocument;
    const game = new Game(data, { getRandomCardIndex });
    expect(game.completed, "game should be completed").toBe(false);

    mockCardValues(userId, [8, 8, 8, 8]);
    await game.action("double", syncIndex++, { userId });
  });
});
