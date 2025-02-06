import { ChestDocument } from "@core/types/chests/ChestDocument";

/**
 * A rolled reel has a length of 52, so for a default we do...
 *
 * preview: length of 21
 * placeholders: length of 31
 *
 * ...and placeholders will ensure we load all item images before spinning.
 */
export function createDemoReel(chest: ChestDocument) {
  const items = chest.items;
  const jackpot = items[0];
  const p1 = items[items.length - 1];
  const p2 = items[items.length - 2];

  const segment = [p2, p1, p2, p1, p2, p1, p2, p1, p2, p1];

  const preview = [...segment, jackpot, ...segment];

  const placeholders = [];
  let cursor = 0;

  while (placeholders.length < 31) {
    if (cursor >= items.length) {
      cursor = 0;
    }
    placeholders.push(items[cursor++]);
  }

  const reel = [...preview, ...placeholders];

  return reel;
}
