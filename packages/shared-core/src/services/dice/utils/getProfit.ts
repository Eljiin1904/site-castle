import { DiceTargetKind } from "#core/types/dice/DiceTargetKind";
import { getMultiplier } from "./getMultiplier";

export function getProfit({
  betAmount,
  targetValue,
  targetKind,
}: {
  betAmount: number;
  targetValue: number;
  targetKind: DiceTargetKind;
}): number {
  const multiplier = getMultiplier({ targetKind, targetValue });

  return Math.round(betAmount * multiplier) - betAmount;
}
