import { ChestDocument } from "@core/types/chests/ChestDocument";
import { Div } from "@client/comps/div/Div";
import { Placeholder } from "@client/comps/placeholder/Placeholder";
import { Span } from "@client/comps/span/Span";
import { Button } from "@client/comps/button/Button";
import { SvgMinusCircle } from "@client/svgs/common/SvgMinusCircle";
import { SvgPlusCircle } from "@client/svgs/common/SvgPlusCircle";
import { Vector } from "@client/comps/vector/Vector";
import { SvgSearch } from "@client/svgs/common/SvgSearch";
import { ChestCard } from "@client/comps/chests/ChestCard";
import { Dialogs } from "@client/services/dialogs";
import { CasePickerInspector } from "./CasePickerInspector";
import "./PickerCard.scss";

export const PickerCardPlaceholder = () => {
  return <Placeholder className="PickerCard" />;
};

export const PickerCard = ({
  chest,
  maxed,
  quantity,
  setQuantity,
}: {
  chest: ChestDocument;
  maxed: boolean;
  quantity: number | undefined;
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
      className="PickerCard"
      chest={chest}
    >
      {buttons}
      <Vector
        data-tooltip-id="app-tooltip"
        data-tooltip-content="View Contents"
        position="absolute"
        top={8}
        right={8}
        as={SvgSearch}
        size={16}
        color="light-blue"
        hover="highlight"
        onClick={() =>
          Dialogs.open("secondary", <CasePickerInspector chest={chest} />)
        }
      />
    </ChestCard>
  );
};
