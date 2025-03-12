import type { ItemLikeDocument } from "./ItemLikeDocument";
import type { ItemLootData } from "./ItemLootData";

export interface ItemDocument extends ItemLikeDocument {
  loot: ItemLootData | null;
}
