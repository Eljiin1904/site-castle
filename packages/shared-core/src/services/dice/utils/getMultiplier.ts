import { DiceTargetKind } from "#core/types/dice/DiceTargetKind";
import { edgeRate } from "../constants/edgeRate";
import { maxValue } from "../constants/maxValue";

export function getMultiplier({
  targetValue,
  targetKind,
}: {
  targetValue: number;
  targetKind: DiceTargetKind;
}): number {
  switch (targetKind) {
    case "over": {
      return (maxValue / (maxValue - targetValue)) * (1 - edgeRate);
    }
    case "under": {
      return (maxValue / targetValue) * (1 - edgeRate);
    }
  }
}
