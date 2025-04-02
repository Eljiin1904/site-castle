import { edgeRate } from "../constants/edgeRate";
import { getTileCount } from "./getTileCount";

export function getMultiplier({
  gridSize,
  mineCount,
  revealCount,
}: {
  gridSize: number;
  mineCount: number;
  revealCount: number;
}) {
  const tileCount = getTileCount(gridSize);

  if (mineCount >= tileCount) {
    throw new Error("Invalid mine count.");
  }

  let multiplier = 1;

  for (let n = 0; n < revealCount; n++) {
    const d = tileCount - n;
    multiplier *= d / (d - mineCount);
  }

  multiplier *= 1 - edgeRate;

  return multiplier;
}
