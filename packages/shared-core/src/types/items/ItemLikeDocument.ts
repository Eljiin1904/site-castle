import type { ItemEdition } from "./ItemEdition";
import type { ItemSubType } from "./ItemSubType";
import type { ItemType } from "./ItemType";
import type { ItemWear } from "./ItemWear";

export interface ItemLikeDocument {
  _id: string;
  marketHashName: string;
  slug: string;
  type: ItemType;
  subType: ItemSubType;
  wear: ItemWear | null | undefined;
  edition: ItemEdition;
  baseName: string;
  styleName: string;
  symbol: string | null | undefined;
}
