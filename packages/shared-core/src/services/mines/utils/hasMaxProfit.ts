import { maxProfit } from "../constants/maxProfit";
import { getPayout } from "./getPayout";

export function hasMaxProfit({
  betAmount,
  gridSize,
  mineCount,
  revealCount,
}: {
  betAmount: number;
  gridSize: number;
  mineCount: number;
  revealCount: number;
}) {
  const { profit } = getPayout({
    betAmount,
    gridSize,
    mineCount,
    revealCount,
  });

  return profit >= maxProfit;
}
