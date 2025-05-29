import { Card } from "../../models/Card";
import { Player } from "../../models/Player";

export function getPlayerCards(player: Player) {
  const cards: Card[] = [];
  const firstHand = player.hands[0];
  const secondHand = player.hands[1];
  cards.push(firstHand.cards[0]);
  if (secondHand) cards.push(secondHand.cards[0]);
  cards.push(...firstHand.cards.slice(1));
  if (secondHand) cards.push(...secondHand.cards.slice(1));
  return cards;
}
