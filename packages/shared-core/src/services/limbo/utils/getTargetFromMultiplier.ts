import { edgeRate } from "../constants/edgeRate";
import { maxValue } from "../constants/maxValue";

export function getTargetFromMultiplier(multiplier: number): number {
  const targetValue = maxValue - (maxValue * (1 - edgeRate)) / multiplier;

  return Math.round(targetValue);
}
