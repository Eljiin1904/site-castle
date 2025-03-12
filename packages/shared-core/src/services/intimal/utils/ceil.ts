export function ceil(integer: number, decimals = 2, precision = 6) {
  return (
    Math.ceil(integer / Math.pow(10, precision - decimals)) *
    Math.pow(10, precision - decimals)
  );
}
