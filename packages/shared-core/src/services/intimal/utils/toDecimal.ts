import { ceil } from "./ceil";
import { floor } from "./floor";

export function toDecimal(integer: number, decimals = 2, precision = 6) {
  if (integer > 0) {
    return floor(integer, decimals, precision) / Math.pow(10, precision);
  } else {
    return ceil(integer, decimals, precision) / Math.pow(10, precision);
  }
}
