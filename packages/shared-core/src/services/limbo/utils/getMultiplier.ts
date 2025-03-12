import { edgeRate } from "../constants/edgeRate";
import { maxValue } from "../constants/maxValue";

export function getMultiplier({
  targetValue,
}: {
  targetValue: number;
}): number {
  let multiplier = (maxValue / (maxValue - targetValue)) * (1 - edgeRate);

  multiplier = Math.max(1, multiplier);
  multiplier = Math.min(1e6, multiplier);

  return multiplier;
}
