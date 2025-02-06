import { ChestDocument } from "@core/types/chests/ChestDocument";

/**
 * A rolled reel has a length of 32, so for a default we do...
 *
 * [0-3]: Origin Left
 * [4]: Best
 * [5-8]: Origin Right
 * [9-31]: Placeholders
 *
 */
export function createDemoReel(chest: ChestDocument) {
  const items = chest.items;

  const best = items[0];

  const p1 = items[items.length - 1];
  const p2 = items[items.length - 2];

  const reel = [p2, p1, p2, p1, best, p2, p1, p2, p1];

  let cursor = 0;

  while (reel.length < 32) {
    if (cursor >= items.length) {
      cursor = 0;
    }
    reel.push(items[cursor++]);
  }

  return reel;
}
