import { ChestDocument } from "@core/types/chests/ChestDocument";
import { ChestItem } from "@core/types/chests/ChestItem";
import { ChestRoll } from "@core/types/chests/ChestRoll";

/**
 * Creates a reel with a length of 52.
 *
 * [0-9]: Placeholder
 * [10]: Jackpot
 * [11-20]: Placeholder
 * [21-30]: Far
 * [31-40]: Left
 * [41]: Loot
 * [42-51]: Right
 */
export function createSpinReel({
  chest,
  roll,
  previous,
}: {
  chest: ChestDocument;
  roll: ChestRoll;
  previous?: ChestItem[];
}) {
  const items = chest.items;
  const loot = items[roll.lootIndex];

  const jackpot = items[0];
  const p1 = items[items.length - 1];
  const p2 = items[items.length - 2];

  const segment = [p2, p1, p2, p1, p2, p1, p2, p1, p2, p1];

  const preview = previous
    ? [...previous.slice(previous.length - 21, previous.length)]
    : [...segment, jackpot, ...segment];

  const reel = [...preview, ...segment, ...segment, loot, ...segment];

  for (let i = 0; i < 4; i++) {
    const item = items[roll.reel[i]];
    const index = roll.reel[i + 4];
    reel.splice(index, 1, item);
  }

  return reel;
}
