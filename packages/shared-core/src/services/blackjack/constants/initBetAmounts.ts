export function getInitBetAmounts() {
  return {
    "lucky-ladies": 0,
    "blackjack-15x": 0,
    "21+3": 0,
    "perfect-pairs": 0,
    "main-bet": 0,
  }; // as const;
}
type InitBetAmounts = ReturnType<typeof getInitBetAmounts>;

export function friendlyBetType(betType: keyof InitBetAmounts | "insurance") {
  switch (betType) {
    case "lucky-ladies":
      return "Lucky Ladies";
    case "blackjack-15x":
      return "Blackjack 15x";
    case "21+3":
      return "21+3";
    case "perfect-pairs":
      return "Perfect Pairs";
    case "main-bet":
      return "Main Bet";
    case "insurance":
      return "Insurance";
    default: {
      console.error("Invalid betType", betType);
      return betType;
    }
  }
}
