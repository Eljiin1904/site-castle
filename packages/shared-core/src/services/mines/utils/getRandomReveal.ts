import { Numbers } from "#core/services/numbers";
import { getTileCount } from "./getTileCount";

export function getRandomReveal({ gridSize, reveals }: { gridSize: number; reveals: number[] }) {
  const tileCount = getTileCount(gridSize);
  const tileIndexes = [];

  for (let i = 0; i < tileCount; i++) {
    if (!reveals.includes(i)) {
      tileIndexes.push(i);
    }
  }

  const rollIndex = Numbers.randomInt(0, tileIndexes.length - 1);

  return tileIndexes[rollIndex];
}
