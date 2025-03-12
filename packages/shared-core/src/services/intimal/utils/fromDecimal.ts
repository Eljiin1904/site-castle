export function fromDecimal(decimal: number, precision = 6) {
  return Math.floor(decimal * Math.pow(10, precision));
}
