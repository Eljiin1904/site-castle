import { round } from "./round";

export function toPercentString(value: number, decimals = 2) {
  return `${round((value || 0) * 100, decimals).toFixed(decimals)}%`;
}
