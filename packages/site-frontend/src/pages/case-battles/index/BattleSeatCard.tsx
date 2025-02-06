import { Div } from "@client/comps/div/Div";
import { Vector } from "@client/comps/vector/Vector";
import { SvgPlus } from "@client/svgs/common/SvgPlus";
import "./BattleSeatCard.scss";

export const BattleSeatCard = ({ onClick }: { onClick: () => void }) => {
  return (
    <Div
      className="BattleSeatCard"
      height={40}
      width={40}
      center
      bg="brown-7"
      border
      borderColor="yellow"
      data-tooltip-id="app-tooltip"
      data-tooltip-content="Take Seat"
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      <Vector
        as={SvgPlus}
        size={12}
        color="yellow"
      />
    </Div>
  );
};
