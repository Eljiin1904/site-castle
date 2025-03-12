import { DiceTargetKind } from "#core/types/dice/DiceTargetKind";

export function isWin({
  targetValue,
  targetKind,
  rollValue,
}: {
  targetValue: number;
  targetKind: DiceTargetKind;
  rollValue: number;
}): boolean {
  switch (targetKind) {
    case "over": {
      return targetValue < rollValue;
    }
    case "under": {
      return targetValue > rollValue;
    }
  }
}
