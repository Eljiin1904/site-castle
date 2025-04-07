import { getMineMinMax } from "./getMineMinMax";

export function clampMineCount({ gridSize, mineCount }: { gridSize: number; mineCount: number }) {
  const { min, max } = getMineMinMax(gridSize);

  let clamped = mineCount;

  clamped = Math.max(min, clamped);
  clamped = Math.min(max, clamped);

  return clamped;
}
