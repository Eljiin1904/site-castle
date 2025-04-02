import { getTileCount } from "./getTileCount";

export function getMineMinMax(gridSize: number) {
  const tileCount = getTileCount(gridSize);

  return {
    min: 1,
    max: tileCount - 1,
  };
}
