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
      px={8}
      py={8}
      hover="none"
      {...forwardProps}
    >
      {children}
      <Div
        fx
        height={small ? 64 : 80}
        center
      >
        <ItemIcon
          imageType="png"
          imagePath={`/items/${item.slug}`}
          size={small ? "50px" : "64px"}
          rarity={rarity}
        />
      </Div>
      <Span
        fontSize={small ? 11 : 13}
        fontWeight="medium"
        color="white"
        textAlign="center"
        textOverflow="ellipsis"
        mt={8}
      >
        {item.baseName}
      </Span>
      <Span
        fontSize={small ? 11 : 12}
        textAlign="center"
        textOverflow="ellipsis"
        mt={small ? 3 : 4}
      >
        {prefixSymbol && item.symbol && `[${item.symbol}] `}
        {item.edition !== "Standard" && item.edition + " "}
        {item.styleName}
      </Span>
      {valueElement || (
        <Tokens
          value={tokenValue}
          fontSize={small ? 11 : 14}
          mt={small ? 8 : 12}
        />
      )}
    </ItemBox>
  );
};
