import classNames from "classnames";
import { LootItem } from "@core/types/items/BasicItem";
import { Span } from "@client/comps/span/Span";
import { Placeholder } from "@client/comps/placeholder/Placeholder";
import { ItemCard } from "@client/comps/item/ItemCard";
import "./ItemPickerCard.scss";

export const ItemPickerCardPlaceholder = () => {
  return (
    <Placeholder
      className="ItemPickerCard"
      bg="brown-6"
    />
  );
};

export const ItemPickerCard = ({
  item,
  disabled,
  onClick,
}: {
  item: LootItem;
  disabled?: boolean;
  onClick: () => void;
}) => {
  return (
    <ItemCard
      className={classNames("ItemPickerCard", { disabled })}
      item={item}
      tokenValue={item.lootValue}
      hover={disabled ? "none" : "highlight"}
      cursor={disabled ? "not-allowed" : undefined}
      onClick={disabled ? undefined : onClick}
    >
      {item.symbol && (
        <Span
          fontSize={14}
          color="gray"
          position="absolute"
          top={8}
          left={8}
        >
          {item.symbol}
        </Span>
      )}
      <Span
        fontSize={14}
        color="gray"
        position="absolute"
        right={8}
        top={8}
      >
        {item.lootCount}
      </Span>
    </ItemCard>
  );
};
