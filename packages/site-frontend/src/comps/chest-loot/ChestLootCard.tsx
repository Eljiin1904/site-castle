import { Fragment, useState } from "react";
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
      p={small ? 20: 24}
      pt={small ? 40 : 48}
      border
      borderColor="brown-4"
    >
      <Div
        fx
        justify="center"
        height={small ? 20 : 24}
        bg="black-hover"
        position="absolute"
        color="light-sand"
        top={0}
        flexCenter
        gap={4}
      >
        {!hovered ? <Fragment>
         <Span color="dark-sand" fontSize={10}>Chance:</Span>
         <Span color="light-sand" fontSize={10}>{`${Numbers.round(Intimal.toDecimal(item.dropRate, 6) * 100, 4)}%`}</Span>
        </Fragment> :  <Span color="dark-sand" fontSize={10}>
          {`${start} - ${end}`}
        </Span>}
        {/* <Span size={small ? 10 : 12}>{item.symbol}</Span> */}
      </Div>
    </ItemCard>
  );
};
