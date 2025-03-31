import classNames from "classnames";
import { Div } from "@client/comps/div/Div";
import { Double } from "#app/services/double";
import { DoubleColor } from "@core/types/double/DoubleColor";
import { Vector } from "@client/comps/vector/Vector";
import "./DoubleBetIcon.scss";

export const DoubleIcon = ({
  className,
  color,
  bait,
  last100 = false
}: {
  className?: string;
  color: DoubleColor;
  bait: boolean;
  last100?: boolean;
}) => {
  
  const icon = Double.getIconFromColor({color, bait });

  return (
    <Div
      className={classNames("DoubleIcon", className, color, {last100}, { bait })}
      center
      p={8}
    >
      { <Vector className="icon" as={icon} size={last100 ? 10: 16} />}
    </Div>
  );
};
