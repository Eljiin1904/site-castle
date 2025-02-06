import { ChestDocument } from "@core/types/chests/ChestDocument";
import { ChestRoll } from "@core/types/chests/ChestRoll";

/**
 * Creates a reel with a length of 32.
 *
 * [0-3]: Origin Left
 * [4]: Best
 * [5-8]: Origin Right
 * [9-22]: Placeholders
 * [23-26]: Result Left
 * [27]: Loot
 * [28-31]: Result Right
 */
export function createSpecialReel({
  chest,
  roll,
}: {
  chest: ChestDocument;
  roll: ChestRoll;
}) {
  const items = chest.items.map((x) => ({ ...x, special: false }));

  const best = items[0];
  const loot = items[roll.lootIndex];

  const p1 = items[1];
  const p2 = items[2];

  const reel = [
    p2,
    p1,
    p2,
    p1,
    best,
    p2,
    p1,
    p2,
    p1,
    p2,
    p1,
    p2,
    p1,
    p2,
    p1,
    p2,
    p1,
    p2,
    p1,
    p2,
    p1,
    p2,
    p1,
    p2,
    p1,
    p2,
    p1,
    loot,
    p2,
    p1,
    p2,
    p1,
  ];

  for (let i = 0; i < 4; i++) {
    const item = items[roll.reel[i]];
    const index = roll.reel[i + 4];
    reel.splice(index, 1, item);
  }

  return reel;
}
