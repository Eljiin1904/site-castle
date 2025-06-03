export function compressRange(
  val: number,
  min: number,
  mult: number,
  type: "geo" | "exp",
) {
  let maxDif = val - min;
  if (maxDif < 0) maxDif = 0;
  const add = type == "geo" ? maxDif * mult : Math.pow(maxDif, mult);
  return val - maxDif + add;
}
