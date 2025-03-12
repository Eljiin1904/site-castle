import { DoubleColor } from "#core/types/double/DoubleColor";

export function getColor(roll: number): DoubleColor {
  if (roll === 1) {
    return "green";
  } else if (roll % 2 === 0) {
    return "red";
  } else {
    return "black";
  }
}
