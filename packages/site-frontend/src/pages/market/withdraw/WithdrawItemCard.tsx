import { useState } from "react";
import { MarketItemDocument } from "@core/types/market/MarketItemDocument";
import { Items } from "@core/services/items";
import { Intimal } from "@core/services/intimal";
import { ItemCard } from "@client/comps/item/ItemCard";
import { Placeholder } from "@client/comps/placeholder/Placeholder";
import { Div } from "@client/comps/div/Div";
import { Span } from "@client/comps/span/Span";
import { Vector } from "@client/comps/vector/Vector";
import { SvgDollarSign } from "@client/svgs/common/SvgDollarSign";
import { Market } from "#app/services/market";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import "./WithdrawItemCard.scss";

export const WithdrawItemPlaceholder = () => {
  return <Placeholder className="WithdrawItemCard" />;
};

export const WithdrawItemCard = ({
  item,
  onClick,
}: {
  item: MarketItemDocument;
  onClick: () => void;
}) => {
  const [hovered, setHovered] = useState(false);
  const layout = useAppSelector((x) => x.style.mainLayout);
  const small = layout === "mobile";
  const icon = Market.getProviderIcon(item.provider);

  return (
    <ItemCard
      className="WithdrawItemCard"
      item={Items.getBasicItem(item)}
      tokenValue={item.tokenValue}
      size={small ? "sm" : "md"}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      valueElement={
        hovered ? (
          <Div
            fx
            center
            mt={small ? 8 : 12}
          >
            <Vector
              as={SvgDollarSign}
              size={14}
              color="light-green"
            />
            <Span
              family="title"
              weight="bold"
              color="white"
            >
              {Intimal.toLocaleString(item.tokenValue / 2)}
            </Span>
          </Div>
        ) : undefined
      }
    >
      <Div
        fx
        justify="space-between"
        mb={small ? 8 : 4}
      >
        <Span size={small ? 10 : 12}>{item.symbol || ""}</Span>
        <Vector
          as={icon}
          width={small ? 60 : 72}
          height={small ? 12 : 16}
          preserveAspectRatio="xMaxYMid meet"
        />
      </Div>
    </ItemCard>
  );
};
