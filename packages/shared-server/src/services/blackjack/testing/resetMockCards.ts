import { CardData, CardValue } from "@core/types/blackjack/CardData";
import { cardMap } from "./cardMap";

export function mockCards(userId: string, cardValues: CardData[], resetAtEnd = false) {
  if (!cardMap) throw new Error("No cardMap");
  cardMap.set(userId, genMap(cardValues, resetAtEnd));
}

function genMap(cards: CardData[], resetAtEnd: boolean) {
  let orderIndex = 0;
  cards = cards.map((card) => ({ ...card, orderIndex: orderIndex++ }));
  return { index: 0, cards, resetAtEnd };
}

export function mockCardValues(userId: string, cardValues: CardValue[]) {
  const cardData: CardData[] = cardValues.map((value) => ({
    value,
    suit: "spades",
  }));
  mockCards(userId, cardData);
}

const suitAbbrevHash: Record<string, CardData["suit"]> = {
  S: "spades",
  H: "hearts",
  D: "diamonds",
  C: "clubs",
};
const suitAbbrevAr: (keyof typeof suitAbbrevHash)[] = ["S", "H", "D", "C"] as const;
export function mockCardAbbrev(userId: string, cardAbbrevs: string[], resetAtEnd: boolean) {
  const cardAr: CardData[] = [];
  cardAbbrevs = cardAbbrevs.map((abbrev) => abbrev.toUpperCase());
  cardAbbrevs.forEach((abbrev) => {
    suitAbbrevAr.forEach((suitAbbrev) => {
      if (abbrev.indexOf(suitAbbrev) !== -1) {
        const valueStr = abbrev.replace(suitAbbrev, ""); // as CardData["value"];
        const suit = suitAbbrevHash[suitAbbrev] as CardData["suit"];
        // @ts-ignore
        const value: CardValue = ["A", "K", "Q", "J"].includes(valueStr)
          ? valueStr
          : parseInt(valueStr);

        if (!suit || !value) throw new Error("Invalid cardAbbrev");

        // @ts-ignore
        cardAr.push({ value, suit });
      }
    });
  });
  mockCards(userId, cardAr, resetAtEnd);
}

export function clearMockCards(userId: string) {
  cardMap.delete(userId);
}
