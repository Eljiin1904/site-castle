import { describe, it, expect } from "vitest";
import { createSidebetArgs } from "../util/createSidebetArgs";
import { get21Plus3 } from "#server/services/blackjack/side-bets/get21Plus3";

describe("21 +3", () => {
  it("Suited Three of a Kind", () => {
    const { player, dealer } = createSidebetArgs({
      betAmount: 10,
      playerCards: [
        { value: "A", suit: "hearts" },
        { value: "A", suit: "hearts" },
      ],
      dealerCards: [
        { value: "A", suit: "hearts" },
        { value: "K", suit: "spades" },
      ],
    });

    const result = get21Plus3({ player, dealer });

    expect(result).toEqual({
      type: "21+3",
      title: "Suited Three of a Kind",
      multiplier: 100,
      amount: 1000,
    });
  });

  it("Straight Flush - A High", () => {
    const { player, dealer } = createSidebetArgs({
      betAmount: 10,
      playerCards: [
        { value: "A", suit: "hearts" },
        { value: "K", suit: "hearts" },
      ],
      dealerCards: [
        { value: "Q", suit: "hearts" },
        { value: 5, suit: "spades" },
      ],
    });

    const result = get21Plus3({ player, dealer });

    expect(result).toEqual({
      type: "21+3",
      title: "Straight Flush",
      multiplier: 50,
      amount: 500,
    });
  });

  it("Straight Flush - A Low", () => {
    const { player, dealer } = createSidebetArgs({
      betAmount: 10,
      playerCards: [
        { value: "A", suit: "hearts" },
        { value: 3, suit: "hearts" },
      ],
      dealerCards: [
        { value: 2, suit: "hearts" },
        { value: 8, suit: "spades" },
      ],
    });

    const result = get21Plus3({ player, dealer });

    expect(result).toEqual({
      type: "21+3",
      title: "Straight Flush",
      multiplier: 50,
      amount: 500,
    });
  });

  it("Three of a Kind", () => {
    const { player, dealer } = createSidebetArgs({
      betAmount: 10,
      playerCards: [
        { value: 9, suit: "hearts" },
        { value: 9, suit: "spades" },
      ],
      dealerCards: [
        { value: 9, suit: "spades" },
        { value: "K", suit: "diamonds" },
      ],
    });

    const result = get21Plus3({ player, dealer });

    expect(result).toEqual({
      type: "21+3",
      title: "Three of a Kind",
      multiplier: 40,
      amount: 400,
    });
  });

  it("Straight", () => {
    const { player, dealer } = createSidebetArgs({
      betAmount: 10,
      playerCards: [
        { value: 7, suit: "hearts" },
        { value: 6, suit: "spades" },
      ],
      dealerCards: [
        { value: 8, suit: "spades" },
        { value: "K", suit: "diamonds" },
      ],
    });

    const result = get21Plus3({ player, dealer });

    expect(result).toEqual({
      type: "21+3",
      title: "Straight",
      multiplier: 10,
      amount: 100,
    });
  });

  it("Straight - A High", () => {
    const { player, dealer } = createSidebetArgs({
      betAmount: 10,
      playerCards: [
        { value: "A", suit: "hearts" },
        { value: "Q", suit: "spades" },
      ],
      dealerCards: [
        { value: "K", suit: "spades" },
        { value: 9, suit: "diamonds" },
      ],
    });

    const result = get21Plus3({ player, dealer });

    expect(result).toEqual({
      type: "21+3",
      title: "Straight",
      multiplier: 10,
      amount: 100,
    });
  });

  it("Straight - A Low", () => {
    const { player, dealer } = createSidebetArgs({
      betAmount: 10,
      playerCards: [
        { value: 3, suit: "hearts" },
        { value: "A", suit: "spades" },
      ],
      dealerCards: [
        { value: 2, suit: "spades" },
        { value: 9, suit: "diamonds" },
      ],
    });

    const result = get21Plus3({ player, dealer });

    expect(result).toEqual({
      type: "21+3",
      title: "Straight",
      multiplier: 10,
      amount: 100,
    });
  });

  it("Flush", () => {
    const { player, dealer } = createSidebetArgs({
      betAmount: 10,
      playerCards: [
        { value: 7, suit: "hearts" },
        { value: "Q", suit: "hearts" },
      ],
      dealerCards: [
        { value: 8, suit: "hearts" },
        { value: "K", suit: "diamonds" },
      ],
    });

    const result = get21Plus3({ player, dealer });

    expect(result).toEqual({
      type: "21+3",
      title: "Flush",
      multiplier: 5,
      amount: 50,
    });
  });

  it("No match", () => {
    const { player, dealer } = createSidebetArgs({
      betAmount: 10,
      playerCards: [
        { value: 7, suit: "hearts" },
        { value: "Q", suit: "spades" },
      ],
      dealerCards: [
        { value: 8, suit: "hearts" },
        { value: "K", suit: "diamonds" },
      ],
    });

    const result = get21Plus3({ player, dealer });

    expect(result).toEqual(null);
  });
});
