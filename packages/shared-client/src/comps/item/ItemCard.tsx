import { FC } from "react";
import classNames from "classnames";
import { Items } from "@core/services/items";
import { BasicItem } from "@core/types/items/BasicItem";
import { Div, DivProps } from "../div/Div";
import { Span } from "../span/Span";
import { Tokens } from "../tokens/Tokens";
import { ItemBox } from "./ItemBox";
import { ItemIcon } from "./ItemIcon";
import "./ItemCard.scss";

export type ItemCardProps = DivProps & {
  item: BasicItem;
  tokenValue: number;
  size?: "md" | "sm";
  prefixSymbol?: boolean;
  valueElement?: JSX.Element;
};

export const ItemCard: FC<ItemCardProps> = ({
  className,
  children,
  item,
  tokenValue,
  size = "md",
  prefixSymbol,
  valueElement,
  ...forwardProps
}) => {
  const small = size === "sm";
  const rarity = Items.getRarity(tokenValue);

  return (
    <ItemBox
      className={classNames("ItemCard", className)}
      rarity={rarity}
      column
      align="center"
      p={24}
      hover="none"
      {...forwardProps}
    >
      {children}
      <Div
        className="image-ctn"
        center
      >
        <ItemIcon
          imageType="png"
          imagePath={`/chests/${item.slug}`}
          size={small ? "50px" : "64px"}
          rarity={rarity}
        />
      </Div>
      {item.baseName && <Span
        weight="semi-bold"
        textOverflow="ellipsis"
        color="light-sand"
        fontSize={16}
        mt={32}
      >
        {item.baseName}
      </Span>
      }
      <Span
        weight="semi-bold"
        textOverflow="ellipsis"
        color="light-sand"
        fontSize={16}
        mt={32}
      >
        {prefixSymbol && item.symbol && `[${item.symbol}] `}
        {item.edition !== "Standard" && item.edition + " "}
        {item.styleName}
      </Span>
      {valueElement || (
        <Tokens
          value={tokenValue}
          mt={8}
          color="dark-sand"
        />
      )}
    </ItemBox>
  );
};
