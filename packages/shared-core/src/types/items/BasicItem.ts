import type { ItemEdition } from "./ItemEdition";
import type { ItemSubType } from "./ItemSubType";
import type { ItemWear } from "./ItemWear";

export interface BasicItem {
  id: string;
  slug: string;
  subType: ItemSubType;
  wear: ItemWear | null | undefined;
  edition: ItemEdition;
  symbol: string | null | undefined;
  baseName: string;
  styleName: string;
}

export interface LootItem extends BasicItem {
  lootValue: number;
  lootCount: number;
}
