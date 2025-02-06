import { ChestDocument } from "@core/types/chests/ChestDocument";
import { Div } from "@client/comps/div/Div";
import { Span } from "@client/comps/span/Span";
import { Button } from "@client/comps/button/Button";
import { SvgMinusCircle } from "@client/svgs/common/SvgMinusCircle";
import { SvgPlusCircle } from "@client/svgs/common/SvgPlusCircle";
import { ChestCard } from "@client/comps/chests/ChestCard";
import "./CaseCard.scss";

export const CaseCard = ({
  chest,
  maxed,
  quantity,
  disableDrag,
  setQuantity,
}: {
  chest: ChestDocument;
  quantity: number | undefined;
  maxed: boolean;
  disableDrag: boolean;
  setQuantity: (x: number | undefined) => void;
}) => {
  let buttons;

  if (quantity === undefined) {
    buttons = (
      <Button
        kind="primary"
        size="xs"
        label="Add"
        fx
        mt={16}
        disabled={maxed}
        onClick={() => setQuantity(1)}
      />
    );
  } else {
    buttons = (
      <Div
        fx
        mt={16}
      >
        <Button
          kind="secondary"
          size="xs"
          icon={SvgMinusCircle}
          onClick={() => setQuantity(quantity - 1)}
        />
        <Div
          grow
          center
          bg="brown-8"
          borderTop
          borderBottom
        >
          <Span
            family="title"
            weight="bold"
            color="white"
          >
            {quantity}
          </Span>
        </Div>
        <Button
          kind="secondary"
          size="xs"
          icon={SvgPlusCircle}
          disabled={maxed}
          onClick={() => setQuantity(quantity + 1)}
        />
      </Div>
    );
  }

  return (
    <ChestCard
      className="CaseCard"
      chest={chest}
      hover={disableDrag ? undefined : "border"}
      cursor={disableDrag ? undefined : "grab"}
    >
      {buttons}
    </ChestCard>
  );
};
