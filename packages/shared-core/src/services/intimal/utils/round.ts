export function round(integer: number, precision = 6) {
  return (
    Math.round(integer / Math.pow(10, precision - 2)) *
    Math.pow(10, precision - 2)
  );
}
