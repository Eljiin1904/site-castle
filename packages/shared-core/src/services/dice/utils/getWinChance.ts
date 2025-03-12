import { Numbers } from "#core/services/numbers";
import { DiceTargetKind } from "#core/types/dice/DiceTargetKind";
import { maxValue } from "../constants/maxValue";

export function getWinChance({
  targetValue,
  targetKind,
}: {
  targetValue: number;
  targetKind: DiceTargetKind;
}): number {
  switch (targetKind) {
    case "over": {
      return Numbers.round(((maxValue - targetValue) / maxValue) * 100, 2);
    }
    case "under": {
      return Numbers.round((targetValue / maxValue) * 100, 2);
    }
  }
}
