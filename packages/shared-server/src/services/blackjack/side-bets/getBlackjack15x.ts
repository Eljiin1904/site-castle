import { Player } from "../models/Player";
import getResult from "./util/getResult";

export function getBlackjack15x({ player }: { player: Player }) {
  const amount = player.betAmounts["blackjack-15x"];
  const result = (title: string, multiplier: number) =>
    getResult({
      type: "blackjack-15x",
      title,
      multiplier,
      amount,
    });

  const oneHand = player.hands.length === 1;
  const hasBlackjack = player.hands[0].hasBlackjack();

  if (oneHand && hasBlackjack) return result("Blackjack 15x", 15);

  return null;
}
