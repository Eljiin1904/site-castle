import { DiceTargetKind } from "#core/types/dice/DiceTargetKind";
import { edgeRate } from "../constants/edgeRate";
import { maxValue } from "../constants/maxValue";

export function getTargetMinMax(kind: DiceTargetKind): {
  min: number;
  max: number;
} {
  switch (kind) {
    case "over": {
      return {
        min: maxValue * edgeRate + 100,
        max: maxValue - 1,
      };
    }
    case "under": {
      return {
        min: 1,
        max: maxValue - (maxValue * edgeRate + 100),
      };
    }
  }
}
