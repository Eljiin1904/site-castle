import { DoubleBetKind } from "#core/types/double/DoubleBetKind";

export function getMultiplierFromRoll(roll: number) {
  if (roll === 1) {
    return 14;
  } else if (roll === 2 || roll === 15) {
    return 7;
  } else if (roll % 2 === 0) {
    return 2;
  } else {
    return 2;
  }
}

export function getMultiplierFromBetKind(kind: DoubleBetKind) {
  if (kind === "green") {
    return 14;
  } else if (kind === "bait") {
    return 7;
  } else if (kind === "red") {
    return 2;
  } else {
    return 2;
  }
}
