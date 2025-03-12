import { Intimal } from "#core/services/intimal";
import { DoubleBetKind } from "#core/types/double/DoubleBetKind";

export function getMaxBetAmount(kind: DoubleBetKind) {
  if (kind === "green") {
    return Intimal.fromDecimal(2500);
  } else if (kind === "bait") {
    return Intimal.fromDecimal(5000);
  } else if (kind === "red") {
    return Intimal.fromDecimal(10000);
  } else {
    return Intimal.fromDecimal(10000);
  }
}
