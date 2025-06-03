export function getProfit({
  betAmount,
  multiplier
}: {
  betAmount: number;
  multiplier: number;
}): number {

  return Math.round(betAmount * multiplier) - betAmount;
}
