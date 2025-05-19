import { CardValue } from "#core/types/blackjack/CardData";
import { getCardValues } from "./getCardValues";

export function getCombinedValues(cardValues: CardValue[]) {
  if (cardValues.length === 0) return [];

  const valueArAr = cardValues.map((value) => getCardValues(value));

  const combinedVals = valueArAr.reduce((acc, ar) => {
    if (acc.length === 0) return ar;
    const newAr: number[] = [];
    ar.forEach((val) => {
      acc.forEach((accVal) => {
        if (accVal + val > 40) return; // for perf
        newAr.push(accVal + val);
      });
    });
    return newAr;
  }, [] as number[]);

  // return [...new Set(combinedVals)];
  return Array.from(new Set(combinedVals));
}
