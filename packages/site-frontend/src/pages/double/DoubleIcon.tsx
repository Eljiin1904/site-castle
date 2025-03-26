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
      className={classNames("DoubleIcon", className, color, { bait })}
      center
      p={8}
    >
      {last100 ? <Div className="icon" />: <Vector className="icon" as={icon} size={16} />}
    </Div>
  );
};
