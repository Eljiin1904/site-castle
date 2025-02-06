import { MarketPrice } from "@core/types/market/MarketPrice";
import { Intimal } from "@core/services/intimal";
import { Div } from "@client/comps/div/Div";
import { Vector } from "@client/comps/vector/Vector";
import { Span } from "@client/comps/span/Span";
import { Tokens } from "@client/comps/tokens/Tokens";
import { Market } from "#app/services/market";

export const ProviderCard = ({
  price,
  onClick,
}: {
  price: MarketPrice;
  onClick: () => void;
}) => {
  const icon = Market.getProviderIcon(price.provider);

  const minDeposit =
    price.provider === "skinsback" ? Intimal.fromDecimal(2) : Market.minDeposit;

  const disabled = price.tokenValue < minDeposit;

  return (
    <Div
      fx
      justify="space-between"
      px={12}
      py={8}
      bg="gray-6"
      border
      cursor={disabled ? "not-allowed" : undefined}
      hover={disabled ? undefined : "border"}
      onClick={disabled ? undefined : onClick}
      style={{ opacity: disabled ? 0.7 : 1 }}
    >
      <Vector
        as={icon}
        width={100}
        height={24}
        preserveAspectRatio="xMinYMid meet"
      />
      <Div
        center
        gap={12}
      >
        {disabled && (
          <Span
            size={12}
            color="light-red"
          >
            {`Min is ${Intimal.toDecimal(minDeposit).toFixed(2)}`}
          </Span>
        )}
        <Tokens value={price.tokenValue} />
      </Div>
    </Div>
  );
};
