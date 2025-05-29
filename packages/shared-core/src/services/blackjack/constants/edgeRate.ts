import { BlackjackBetTypeInsurance } from "#core/types/blackjack/BlackjackBetAmounts";
export const edgeRate = 0.005;

export const sidebetEdgeRates: Record<Exclude<BlackjackBetTypeInsurance, "main-bet">, number> = {
  "21+3": 0.0310650887573963,

  "perfect-pairs": 0.0577041,

  "blackjack-15x": 0.2905,

  "lucky-ladies": 0.3083136095,

  insurance: 0.076924,
};
