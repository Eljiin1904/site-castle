import { Div } from "@client/comps/div/Div";
import { Vector } from "@client/comps/vector/Vector";
import { SvgReelArrow } from "#app/svgs/common/SvgReelArrow";
import { DoubleReel } from "./DoubleReel";
import { DoubleViewOverlay } from "./DoubleViewOverlay";
import "./DoubleView.scss";

export const DoubleView = () => {
  return (
    <Div
      className="DoubleView"
      column
      fx
      py={16}
      border
      bg="brown-8"
    >
      <DoubleReel />
      <Vector
        className="arrow arrow-top"
        as={SvgReelArrow}
        width={12}
        height={24}
      />
      <Vector
        className="arrow arrow-bottom"
        as={SvgReelArrow}
        width={12}
        height={24}
      />
      <DoubleViewOverlay />
    </Div>
  );
};
