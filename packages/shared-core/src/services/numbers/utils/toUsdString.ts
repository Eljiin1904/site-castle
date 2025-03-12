export function toUsdString(value: number) {
  return (
    "$" +
    (value || 0).toLocaleString("en", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  );
}
