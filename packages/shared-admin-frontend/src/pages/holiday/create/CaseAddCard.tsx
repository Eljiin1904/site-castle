import { Div } from "@client/comps/div/Div";
import { Span } from "@client/comps/span/Span";
import { Vector } from "@client/comps/vector/Vector";
import { SvgPlus } from "@client/svgs/common/SvgPlus";
import "./CaseAddCard.scss";

export const CaseAddCard = ({ onClick }: { onClick: () => void }) => {
  return (
    <Div
      className="CaseAddCard"
      column
      center
      gap={16}
      bg="brown-8"
      border
      onClick={onClick}
    >
      <Vector
        as={SvgPlus}
        size={24}
        p={12}
        border
      />
      <Span weight="semi-bold">{"Add Case"}</Span>
    </Div>
  );
};
