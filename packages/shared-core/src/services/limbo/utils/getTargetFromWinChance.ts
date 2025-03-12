import { maxValue } from "../constants/maxValue";

export function getTargetValueFromWinChance(winChance: number): number {
  return Math.round((100 - winChance) * (maxValue / 100));
}
