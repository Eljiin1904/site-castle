import { DoubleBetKind } from "#core/types/double/DoubleBetKind";

export function getLabelFromRoll(roll: number) {
  if (roll === 1) {
    return "Green";
  } else if (roll === 2) {
    return "Bait T";
  } else if (roll === 15) {
    return "Bait CT";
  } else if (roll % 2 === 0) {
    return "T";
  } else {
    return "CT";
  }
}

export function getLabelFromBetKind(kind: DoubleBetKind) {
  if (kind === "green") {
    return "Green";
  } else if (kind === "bait") {
    return "Bait";
  } else if (kind === "red") {
    return "T";
  } else {
    return "CT";
  }
}
