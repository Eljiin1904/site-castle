import { Dealer } from "../models/Dealer";
import { Player } from "../models/Player";
import { getPlayerCards } from "./util/getPlayerCards";
import getResult from "./util/getResult";

export function getLuckyLadies({ dealer, player }: { dealer: Dealer; player: Player }) {
  const amount = player.betAmounts["lucky-ladies"];
  const result = (title: string, multiplier: number) =>
    getResult({
      type: "lucky-ladies",
      title,
      multiplier,
      amount,
    });

  const cards = getPlayerCards(player).slice(0, 2);
  if (cards.length !== 2) throw new Error("Lucky Ladies received invalid cards: " + cards.length);
  const [card1, card2] = cards;
  const card1Val = card1.values[0];
  const card2Val = card2.values[0];

  if (card1Val !== card2Val) return null;
  if (card1Val + card2Val !== 20) return null;

  const isQueens = cards.every((card) => card.value === "Q");
  const isHearts = cards.every((card) => card.suit === "hearts");

  const matched = cards[0].value === cards[1].value;

  const suited = cards.every((card, i, arr) => {
    if (i === 0) return true;
    return card.suit === arr[i - 1].suit;
  });

  if (isQueens && isHearts && dealer.hasBlackjack())
    return result("Queen of Hearts Pair & Dealer Blackjack", 1000);
  else if (isQueens && isHearts) return result("Queen of Hearts Pair", 200);
  else if (suited && matched) return result("Matched 20", 25);
  else if (suited) return result("Suited 20", 10);

  return result("Unsuited", 4);
}
