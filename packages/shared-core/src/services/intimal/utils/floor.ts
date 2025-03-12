export function floor(integer: number, decimals = 2, precision = 6) {
  return (
    Math.floor(integer / Math.pow(10, precision - decimals)) *
    Math.pow(10, precision - decimals)
  );
}
