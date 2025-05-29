import { Dealer } from "../models/Dealer";
import { Player } from "../models/Player";
import { getCardRank } from "./util/getCardRank";
import { getPlayerCards } from "./util/getPlayerCards";
import getResult from "./util/getResult";

export function get21Plus3({ dealer, player }: { dealer: Dealer; player: Player }) {
  const amount = player.betAmounts["21+3"];

  const result = (title: string, multiplier: number) =>
    getResult({
      type: "21+3",
      title,
      multiplier,
      amount,
    });

  const playerFirstTwoCards = getPlayerCards(player).slice(0, 2);
  const dealerFirstCard = dealer.hands[0].cards[0];
  const cards = [...playerFirstTwoCards, dealerFirstCard];

  const sameSuit = cards.every((card, i, arr) => {
    if (i === 0) return true;
    return card.suit === arr[i - 1].suit;
  });

  const cardIndexesAceHigh = cards
    .map((card) => getCardRank(card.value, { aceHigh: true }))
    .sort((a, b) => a - b);
  const inARowAceHigh = cardIndexesAceHigh.every((card, i, arr) => {
    if (i === 0) return true;
    return card === arr[i - 1] + 1;
  });
  const cardIndexesAceLow = cards
    .map((card) => getCardRank(card.value, { aceHigh: false }))
    .sort((a, b) => a - b);
  const inARowAceLow = cardIndexesAceLow.every((card, i, arr) => {
    if (i === 0) return true;
    return card === arr[i - 1] + 1;
  });
  const inARow = inARowAceHigh || inARowAceLow;

  const sameValue = cards.every((card, i, arr) => {
    if (i === 0) return true;
    return card.value === arr[i - 1].value;
  });

  if (sameSuit && sameValue) return result("Suited Three of a Kind", 100);
  else if (inARow && sameSuit) return result("Straight Flush", 50);
  else if (sameValue) return result("Three of a Kind", 40);
  else if (inARow) return result("Straight", 10);
  else if (sameSuit) return result("Flush", 5);

  return null;
}
