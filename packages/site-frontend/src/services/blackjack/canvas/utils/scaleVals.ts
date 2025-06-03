export function scaleVals<T extends { [key: string]: number }>(vals: T, scale: number) {
  const scaledVals: Partial<Record<keyof T, number>> = {};
  for (const key in vals) {
    scaledVals[key] = vals[key] * scale;
  }
  return scaledVals as Record<keyof T, number>;
}
