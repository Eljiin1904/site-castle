import classNames from "classnames";
import { DoubleColor } from "@core/types/double/DoubleColor";
import { Div } from "@client/comps/div/Div";
import { SvgDoubleGreenIcon } from "#app/svgs/double/SvgDoubleGreenIcon";
import { SvgDoubleBaitIcon } from "#app/svgs/double/SvgDoubleBaitIcon";
import { SvgDoubleBlackIcon } from "#app/svgs/double/SvgDoubleBlackIcon";
import { SvgDoubleRedIcon } from "#app/svgs/double/SvgDoubleRedIcon";
import { Vector } from "@client/comps/vector/Vector";
import "./DoubleReelCard.scss";

export const DoubleReelCard = ({ index }: { index: number }) => {
  let icon;
  let color: DoubleColor;

  if (index === 1) {
    icon = SvgDoubleGreenIcon;
    color = "green";
  } else if (index === 2) {
    icon = SvgDoubleBaitIcon;
    color = "red";
  } else if (index === 15) {
    icon = SvgDoubleBaitIcon;
    color = "black";
  } else if (index % 2 === 0) {
    icon = SvgDoubleRedIcon;
    color = "red";
  } else {
    icon = SvgDoubleBlackIcon;
    color = "black";
  }

  return (
    <Div
      className={classNames("DoubleReelCard", color)}
      center
      py={8}
      px={12}
    >
      <Vector
        className="icon"
        as={icon}
        size={48}
      />
    </Div>
  );
};
