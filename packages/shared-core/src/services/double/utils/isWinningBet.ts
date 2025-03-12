import { DoubleBetKind } from "#core/types/double/DoubleBetKind";

export function isWinningBet(betKind: DoubleBetKind, roll: number): boolean {
  if (roll === 1) {
    return betKind === "green";
  } else if (roll === 2) {
    return betKind === "red" || betKind === "bait";
  } else if (roll === 15) {
    return betKind === "black" || betKind === "bait";
  } else if (roll % 2 === 0) {
    return betKind === "red";
  } else {
    return betKind === "black";
  }
}
