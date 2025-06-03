import { CardValue } from "@core/types/blackjack/CardData";

export function getCardRank(value: CardValue, { aceHigh }: { aceHigh: boolean }) {
  switch (value) {
    case "J":
      return 11;
    case "Q":
      return 12;
    case "K":
      return 13;
    case "A":
      return aceHigh ? 14 : 1;
    default:
      return value;
  }
}
