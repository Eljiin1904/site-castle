import { useState } from "react";
import { Intimal } from "@core/services/intimal";
import { Numbers } from "@core/services/numbers";
import { ChestDocument } from "@core/types/chests/ChestDocument";
import { ChestItem } from "@core/types/chests/ChestItem";
import { ItemCard } from "@client/comps/item/ItemCard";
import { Span } from "@client/comps/span/Span";
import { Div } from "@client/comps/div/Div";
import { useAppSelector } from "#app/hooks/store/useAppSelector";

export const BattleLogCard = ({
  chest,
  item,
}: {
  chest: ChestDocument;
  item: ChestItem;
}) => {
  const [hovered, setHovered] = useState(false);
  const layout = useAppSelector((x) => x.style.mainLayout);
  const small = layout === "mobile" || layout === "tablet";
  const index = chest.items.findIndex((x) => x.id === item.id);

  let start = 1;

  for (let i = 0; i < index; i++) {
    start += chest.items[i].dropRate;
  }

  const end = start + item.dropRate - 1;

  return (
    <ItemCard
      item={item}
      tokenValue={item.lootValue}
      size={small ? "sm" : "md"}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Div
        fx
        justify="space-between"
      >
        {item.symbol && <Span size={small ? 10 : 12}>{item.symbol}</Span>}
        <Span
          position="absolute"
          right={0}
          size={small ? 10 : 12}
          ml={16}
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
