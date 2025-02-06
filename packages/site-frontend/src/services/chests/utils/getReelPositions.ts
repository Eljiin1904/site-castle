import { ChestRoll } from "@core/types/chests/ChestRoll";

export function getReelPositions({
  itemSize,
  roll,
}: {
  itemSize: number;
  roll?: ChestRoll;
}) {
  const basis = 23;

  const origin = (itemSize * basis) / 2;
  const result = origin - itemSize * basis;

  let end = origin;

  if (roll) {
    const itemOffset = (itemSize * roll.offset) / 100 - itemSize / 2;
    end = result + itemOffset;
  }

  return { origin, end, result };
}
