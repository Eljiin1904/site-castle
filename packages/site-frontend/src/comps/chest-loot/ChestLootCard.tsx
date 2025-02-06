import { useState } from "react";
import classNames from "classnames";
import { Intimal } from "@core/services/intimal";
import { Numbers } from "@core/services/numbers";
import { ChestDocument } from "@core/types/chests/ChestDocument";
import { ChestItem } from "@core/types/chests/ChestItem";
import { ItemCard } from "@client/comps/item/ItemCard";
import { Span } from "@client/comps/span/Span";
import { Div } from "@client/comps/div/Div";
import "./ChestLootCard.scss";

export const ChestLootCard = ({
  chest,
  item,
  layout,
}: {
  chest: ChestDocument;
  item: ChestItem;
  layout: Layout;
}) => {
  const [hovered, setHovered] = useState(false);
  const small = layout === "mobile";
  const index = chest.items.findIndex((x) => x.id === item.id);

  let start = 1;

  for (let i = 0; i < index; i++) {
    start += chest.items[i].dropRate;
  }

  const end = start + item.dropRate - 1;

  return (
    <ItemCard
      className={classNames("ChestLootCard", layout)}
      item={item}
      tokenValue={item.lootValue}
      size={small ? "sm" : "md"}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Div
        fx
        justify="space-between"
        height={small ? 14 : 16}
      >
        <Span size={small ? 10 : 12}>{item.symbol}</Span>
        <Span
          position="absolute"
          right={0}
          size={small ? 10 : 12}
          ml={18}
          textAlign="right"
        >
          {hovered
            ? `${start} - ${end}`
            : `${Numbers.round(Intimal.toDecimal(item.dropRate, 6) * 100, 4)}%`}
        </Span>
      </Div>
    </ItemCard>
  );
};
