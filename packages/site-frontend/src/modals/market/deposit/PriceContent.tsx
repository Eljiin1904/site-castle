import { MarketInventoryItem } from "@core/types/market/MarketInventoryDocument";
import { MarketPrice } from "@core/types/market/MarketPrice";
import { Div } from "@client/comps/div/Div";
import { StatusBar } from "../comps/StatusBar";
import { ProviderCard } from "./ProviderCard";

export const PriceContent = ({
  item,
  onSelect,
}: {
  item: MarketInventoryItem;
  onSelect: (x: MarketPrice) => void;
}) => {
  return (
    <Div
      column
      fx
      gap={24}
    >
      <StatusBar
        label="1/3: Select a Provider"
        progress={0}
      />
      <Div
        fx
        column
        gap={12}
      >
        {item.prices.map((x) => (
          <ProviderCard
            key={x.provider}
            price={x}
            onClick={() => onSelect(x)}
          />
        ))}
      </Div>
    </Div>
  );
};
