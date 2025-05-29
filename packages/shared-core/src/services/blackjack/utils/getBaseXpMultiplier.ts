import { BlackjackBetTypeInsurance } from "#core/types/blackjack/BlackjackBetAmounts";

export function getBaseXpMultiplier({
  betKind,
  subKind,
  edgeRate,
}: {
  betKind: string;
  subKind?: BlackjackBetTypeInsurance;
  edgeRate: number;
}): number {
  if (["blackjack-bet", "blackjack-double", "blackjack-split"].includes(betKind)) {
    return 0.07507507508 / edgeRate; // Default blackjackXpRate
  }

  if (betKind === "blackjack-sidebet-bet") {
    switch (subKind) {
      case "insurance":
        return 1.155015015 / edgeRate; // blackjackInsuranceXpRate
      case "lucky-ladies":
        return 4.629333476 / edgeRate; // blackjackLuckyLadiesXpRate
      case "blackjack-15x":
        return 4.361861862 / edgeRate; // blackjackBlackjack15xXpRate
      case "perfect-pairs":
        return 0.8664279279 / edgeRate; // blackjackPerfectPairsXpRate
      case "21+3":
        return 0.4664427741 / edgeRate; // blackjack213XpRate
      default:
        throw new Error(`Invalid subKind for blackjack-sidebet-bet: ${String(subKind)}`);
    }
  }

  throw new Error(`Invalid betKind for blackjack: ${betKind}`);
}
