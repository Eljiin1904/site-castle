import { FC } from "react";
import classNames from "classnames";
import { Items } from "@core/services/items";
import { ItemRarity } from "@core/types/items/ItemRarity";
import { Div, DivProps } from "../div/Div";
import "./ItemBox.scss";

export type ItemBoxProps = DivProps & {
  rarity: ItemRarity;
  borderLeft?: boolean;
};

export const ItemBox: FC<ItemBoxProps> = ({
  className,
  rarity,
  borderLeft,
  children,
  ...forwardProps
}) => {
  const rarityIndex = Items.rarities.indexOf(rarity);

  return (
    <Div
      className={classNames("ItemBox", className, {
        [`rarity-${rarityIndex}`]: rarityIndex !== undefined,
      })}
      borderBottom={!borderLeft}
      borderLeft={borderLeft}
      borderWidth={2}
      {...forwardProps}
    >
      {children}
    </Div>
  );
};
