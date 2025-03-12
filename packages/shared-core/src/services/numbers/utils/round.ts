/**
 * Rounds a decimal to digits.
 */
export function round(num: number, digits: number) {
  const factor = Math.pow(10, digits);
  return Math.round(num * factor) / factor;
}
