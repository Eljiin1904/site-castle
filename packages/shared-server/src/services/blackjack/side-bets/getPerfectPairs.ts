import { Card } from "../models/Card";
import { Player } from "../models/Player";
import { getPlayerCards } from "./util/getPlayerCards";
import getResult from "./util/getResult";

export function getPerfectPairs({ player }: { player: Player }) {
  const amount = player.betAmounts["perfect-pairs"];
  const result = (title: string, multiplier: number) =>
    getResult({
      type: "perfect-pairs",
      title,
      multiplier,
      amount,
    });

  const cards = getPlayerCards(player).slice(0, 2);
  const [card1, card2] = cards;
  const card1Color = getSuitColor(card1);
  const card2Color = getSuitColor(card2);

  const isPair = card1.value === card2.value;
  const sameSuit = card1.suit === card2.suit;
  const sameColor = card1Color === card2Color;

  const perfectPair = isPair && sameSuit;
  const coloredPair = isPair && sameColor;
  const redBlackPair = isPair && !sameColor;

  if (perfectPair) return result("Perfect Pair", 25);
  else if (coloredPair) return result("Colored Pair", 12);
  else if (redBlackPair) return result("Red/Black Pair", 6);

  return null;
}

function getSuitColor(card: Card) {
  const suit = card.suit;
  if (suit === "hearts" || suit === "diamonds") return "red";
  return "black";
}
