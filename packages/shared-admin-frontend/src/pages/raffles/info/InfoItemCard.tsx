import { LootItem } from "@core/types/items/BasicItem";
import { ItemCard } from "@client/comps/item/ItemCard";
import "./InfoItemCard.scss";

export const InfoItemCard = ({ item }: { item: LootItem }) => {
  return (
    <ItemCard
      className="InfoItemCard"
      item={item}
      tokenValue={item.lootValue}
    />
  );
};
