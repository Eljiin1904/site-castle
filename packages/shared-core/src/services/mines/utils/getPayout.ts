import { getMultiplier } from "./getMultiplier";

export function getPayout(options: {
  betAmount: number;
  gridSize: number;
  mineCount: number;
  revealCount: number;
}) {
  const { betAmount } = options;

  const multiplier = getMultiplier(options);

  const payout = Math.round(betAmount * multiplier);
  const profit = Math.round(betAmount * multiplier) - betAmount;

  return { multiplier, payout, profit };
}
