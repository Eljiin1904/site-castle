import { getMultiplier } from "./getMultiplier";

export function getProfit({
  betAmount,
  targetValue,
}: {
  betAmount: number;
  targetValue: number;
}): number {
  const multiplier = getMultiplier({ targetValue });

  return Math.round(betAmount * multiplier) - betAmount;
}
