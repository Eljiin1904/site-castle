import { getInsuranceBetAmount } from "@core/services/blackjack/Blackjack";
import { Dealer } from "../models/Dealer";
import { Player } from "../models/Player";

export function getInsurance({ dealer, player }: { dealer: Dealer; player: Player }) {
  const amount = player.betAmounts["main-bet"];
  const boughtInsurance = player.insurance === "bought";

  if (!boughtInsurance) return null;

  if (dealer.hasBlackjack())
    return {
      type: "insurance",
      title: "Insurance",
      multiplier: 2,
      amount: amount + getInsuranceBetAmount(amount),
    };

  return null;
}
