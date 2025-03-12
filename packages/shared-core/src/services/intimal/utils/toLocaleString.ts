import { toDecimal } from "./toDecimal";

export function toLocaleString(integer: number, decimals = 2, precision = 6) {
  return toDecimal(integer || 0, decimals, precision).toLocaleString("en-US", {
    maximumFractionDigits: decimals,
    minimumFractionDigits: decimals,
  });
}
