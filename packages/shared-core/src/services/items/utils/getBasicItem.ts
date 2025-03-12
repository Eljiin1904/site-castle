import { BasicItem } from "#core/types/items/BasicItem";
import { ItemLikeDocument } from "#core/types/items/ItemLikeDocument";

export function getBasicItem(item: ItemLikeDocument): BasicItem {
  return {
    id: item._id,
    slug: item.slug,
    subType: item.subType,
    wear: item.wear,
    edition: item.edition,
    symbol: item.symbol,
    baseName: item.baseName,
    styleName: item.styleName,
  };
}
