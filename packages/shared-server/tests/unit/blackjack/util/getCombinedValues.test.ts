import { getCombinedValues } from "#core/services/blackjack/utils/getCombinedValues";
import { CardData } from "#core/types/blackjack/CardData";
import { Card } from "#server/services/blackjack/models/Card";
import { describe, expect, test } from "vitest";

describe("getCombinedValues", () => {
  test("should work with no cards", () => {
    const vals = getCombinedValues([]);
    expect(vals).toEqual([]);
  });

  test("should work with 1 non-ace", () => {
    const cards = [card(7)];
    const vals = getCombinedValues(toValues(cards));
    expect(vals).toEqual([7]);
  });

  test("should work with 1 ace", () => {
    const cards = [card("A")];
    const vals = getCombinedValues(toValues(cards));
    expect(vals).toEqual([1, 11]);
  });

  test("should work with 2 aces", () => {
    const cards = [card("A"), card("A")];
    const vals = getCombinedValues(toValues(cards));
    expect(vals).toEqual([2, 12, 22]);
  });

  test("should work with 2 non-ace cards", () => {
    const cards = [card(7), card(5)];
    const vals = getCombinedValues(toValues(cards));
    expect(vals).toEqual([12]);
  });

  test("should work with 1 ace and 1 non-ace", () => {
    const cards = [card(7), card("A")];
    const vals = getCombinedValues(toValues(cards));
    expect(vals).toEqual([8, 18]);
  });

  test("should work with 3 aces", () => {
    const cards = [card("A"), card("A"), card("A")];
    const vals = getCombinedValues(toValues(cards));
    expect(vals).toEqual([3, 13, 23, 33]);
  });

  test("should work with 2 aces and a non-ace", () => {
    const cards = [card("A"), card("A"), card(7)];
    const vals = getCombinedValues(toValues(cards));
    expect(vals).toEqual([9, 19, 29]);
  });

  test("should work with 4 aces", () => {
    const cards = [card("A"), card("A"), card("A"), card("A")];
    const vals = getCombinedValues(toValues(cards));
    // intentionally dropping vals over 40 for perf
    expect(vals).toEqual([4, 14, 24, 34]);
  });
});

function card(value: CardData["value"]) {
  return new Card({ value, suit: "hearts" }, { isGameCompleted: () => false });
}

function toValues(cards: Card[]) {
  return cards.map((card) => card.value);
}
