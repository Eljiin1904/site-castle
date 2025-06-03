import { describe, expect, it } from "vitest";
import { createSidebetArgs } from "../util/createSidebetArgs";
import { getPerfectPairs } from "#server/services/blackjack/side-bets/getPerfectPairs";

describe("perfect pairs", () => {
  it("Perfect Pair", () => {
    const { player } = createSidebetArgs({
      betAmount: 10,
      playerCards: [
        { value: "A", suit: "hearts" },
        { value: "A", suit: "hearts" },
      ],
      dealerCards: [],
    });

    const result = getPerfectPairs({ player });

    expect(result).toEqual({
      type: "perfect-pairs",
      title: "Perfect Pair",
      multiplier: 25,
      amount: 250,
    });
  });
  it("Perfect Pair v2", () => {
    const { player } = createSidebetArgs({
      betAmount: 10,
      playerCards: [
        { value: 5, suit: "spades" },
        { value: 5, suit: "spades" },
      ],
      dealerCards: [],
    });

    const result = getPerfectPairs({ player });

    expect(result).toEqual({
      type: "perfect-pairs",
      title: "Perfect Pair",
      multiplier: 25,
      amount: 250,
    });
  });

  it("Colored Pair", () => {
    const { player } = createSidebetArgs({
      betAmount: 10,
      playerCards: [
        { value: "A", suit: "hearts" },
        { value: "A", suit: "diamonds" },
      ],
      dealerCards: [],
    });

    const result = getPerfectPairs({ player });

    expect(result).toEqual({
      type: "perfect-pairs",
      title: "Colored Pair",
      multiplier: 12,
      amount: 120,
    });
  });

  it("Colored Pair #2", () => {
    const { player } = createSidebetArgs({
      betAmount: 10,
      playerCards: [
        { value: 3, suit: "spades" },
        { value: 3, suit: "clubs" },
      ],
      dealerCards: [],
    });

    const result = getPerfectPairs({ player });

    expect(result).toEqual({
      type: "perfect-pairs",
      title: "Colored Pair",
      multiplier: 12,
      amount: 120,
    });
  });

  it("Red/Black Pair", () => {
    const { player } = createSidebetArgs({
      betAmount: 10,
      playerCards: [
        { value: 3, suit: "spades" },
        { value: 3, suit: "diamonds" },
      ],
      dealerCards: [],
    });

    const result = getPerfectPairs({ player });

    expect(result).toEqual({
      type: "perfect-pairs",
      title: "Red/Black Pair",
      multiplier: 6,
      amount: 60,
    });
  });

  it("Red/Black Pair #2", () => {
    const { player } = createSidebetArgs({
      betAmount: 10,
      playerCards: [
        { value: "K", suit: "hearts" },
        { value: "K", suit: "clubs" },
      ],
      dealerCards: [],
    });

    const result = getPerfectPairs({ player });

    expect(result).toEqual({
      type: "perfect-pairs",
      title: "Red/Black Pair",
      multiplier: 6,
      amount: 60,
    });
  });

  it("no match", () => {
    const { player } = createSidebetArgs({
      betAmount: 10,
      playerCards: [
        { value: "K", suit: "hearts" },
        { value: "Q", suit: "hearts" },
      ],
      dealerCards: [],
    });

    const result = getPerfectPairs({ player });

    expect(result).toEqual(null);
  });

  it("no match #2", () => {
    const { player } = createSidebetArgs({
      betAmount: 10,
      playerCards: [
        { value: 5, suit: "diamonds" },
        { value: 6, suit: "diamonds" },
      ],
      dealerCards: [],
    });

    const result = getPerfectPairs({ player });

    expect(result).toEqual(null);
  });
});
