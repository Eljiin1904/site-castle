import { CardValue } from "#core/types/blackjack/CardData";

export function getCardValues(value: CardValue) {
  switch (value) {
    case "A":
      return [1, 11];
    case "K":
    case "Q":
    case "J":
      return [10, 10];
    default:
      return [value, value];
  }
}
