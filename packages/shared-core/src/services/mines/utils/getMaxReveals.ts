import { getTileCount } from "./getTileCount";

export function getMaxReveals({ gridSize, mineCount }: { gridSize: number; mineCount: number }) {
  const tileCount = getTileCount(gridSize);

  return tileCount - mineCount;
}
