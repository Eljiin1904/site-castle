import { MarketItemDocument } from "@core/types/market/MarketItemDocument";
import { Div } from "@client/comps/div/Div";
import { Button } from "@client/comps/button/Button";
import { Vector } from "@client/comps/vector/Vector";
import { Tokens } from "@client/comps/tokens/Tokens";
import { Span } from "@client/comps/span/Span";
import { Market } from "#app/services/market";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { StatusBar } from "../comps/StatusBar";

export const PriceContent = ({
  item,
  onSelect,
}: {
  item: MarketItemDocument;
  onSelect: (x: MarketItemDocument) => void;
}) => {
  const tokenBalance = useAppSelector((x) => x.user.tokenBalance);
  const icon = Market.getProviderIcon(item.provider);
  const disabled = tokenBalance < item.tokenValue;

  return (
    <Div
      column
      fx
      fy
      gap={24}
    >
      <StatusBar
        label="1/3: Confirm Selection"
        progress={0}
      />
      <Div
        column
        center
        p={12}
        bg="gray-8"
        border
        grow
      >
        <Tokens
          value={item.tokenValue}
          fontSize={20}
        />
        <Span
          size={10}
          my={10}
        >
          {"provided by"}
        </Span>
        <Vector
          as={icon}
          width={90}
          height={20}
        />
      </Div>
      <Button
        kind="primary"
        label="Buy Skin"
        disabled={disabled}
        onClick={() => onSelect(item)}
      />
    </Div>
  );
};
