import { useState } from "react";
import { MarketInventoryItem } from "@core/types/market/MarketInventoryDocument";
import { Intimal } from "@core/services/intimal";
import { ItemCard } from "@client/comps/item/ItemCard";
import { Div } from "@client/comps/div/Div";
import { Span } from "@client/comps/span/Span";
import { Tokens } from "@client/comps/tokens/Tokens";
import { Vector } from "@client/comps/vector/Vector";
import { SvgDollarSign } from "@client/svgs/common/SvgDollarSign";
import { Market } from "#app/services/market";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import "./DepositItemCard.scss";

export const DepositItemCard = ({
  item,
  onClick,
}: {
  item: MarketInventoryItem;
  onClick: () => void;
}) => {
  const [hovered, setHovered] = useState(false);
  const layout = useAppSelector((x) => x.style.mainLayout);
  const small = layout === "mobile";
  const icon = Market.getProviderIcon(item.prices[0].provider);

  return (
    <ItemCard
      className="DepositItemCard"
      item={item}
      tokenValue={item.bestPrice}
      size={small ? "sm" : "md"}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      valueElement={
        <Div
          fx
          center
          mt={small ? 8 : 12}
          data-tooltip-id="app-tooltip"
          data-tooltip-content={`Best price from ${item.prices.length} providers`}
        >
          {hovered ? (
            <Div
              center
              data-tooltip-id="app-tooltip"
              data-tooltip-content={``}
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
                {Intimal.toLocaleString(item.bestPrice / 2)}
              </Span>
            </Div>
          ) : (
            <Tokens
              value={item.bestPrice}
              fontSize={small ? 11 : 14}
            />
          )}
          <Div
            display="block"
            center
            fontFamily="title"
            fontSize={small ? 11 : 14}
            ml={4}
          >
            <Span weight="semi-bold">{"["}</Span>
            <Span
              color="gold"
              weight="semi-bold"
            >
              {item.prices.length}
            </Span>
            <Span weight="semi-bold">{"]"}</Span>
          </Div>
        </Div>
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
