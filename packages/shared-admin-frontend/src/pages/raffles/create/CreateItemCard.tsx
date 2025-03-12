import { LootItem } from "@core/types/items/BasicItem";
import { ItemCard } from "@client/comps/item/ItemCard";
import "./CreateItemCard.scss";

export const CreateItemCard = ({
  item,
  onClick,
}: {
  item: LootItem;
  onClick: () => void;
}) => {
  return (
    <ItemCard
      className="CreateItemCard"
      item={item}
      tokenValue={item.lootValue}
      onClick={onClick}
    />
  );
};
