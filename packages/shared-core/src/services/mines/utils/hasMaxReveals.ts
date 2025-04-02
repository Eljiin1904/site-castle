import { getMaxReveals } from "./getMaxReveals";

export function hasMaxReveals({
  gridSize,
  mineCount,
  revealCount,
}: {
  gridSize: number;
  mineCount: number;
  revealCount: number;
}) {
  return revealCount === getMaxReveals({ gridSize, mineCount });
}
