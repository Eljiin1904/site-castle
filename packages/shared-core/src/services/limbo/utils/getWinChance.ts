import { maxValue } from "../constants/maxValue";

export function getWinChance({ targetValue }: { targetValue: number }): number {
  return ((maxValue - targetValue) / maxValue) * 100;
}
