import { ItemDocument } from "#core/types/items/ItemDocument";
import { LootItem } from "#core/types/items/BasicItem";
import { getBasicItem } from "./getBasicItem";

export function getLoot(item: ItemDocument): LootItem {
  if (!item.loot) {
    throw new Error("Invalid item, no loot data.");
  }

  return {
    ...getBasicItem(item),
    lootValue: item.loot.tokenValue,
    lootCount: item.loot.count,
  };
}
