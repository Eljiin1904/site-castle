import { CardData } from "@core/types/blackjack/CardData";

export const cardMap = new Map<
  string,
  {
    index: number;
    cards: CardData[];
    resetAtEnd: boolean;
  }
>();
