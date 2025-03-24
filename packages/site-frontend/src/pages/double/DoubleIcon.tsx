import classNames from "classnames";
import { Div } from "@client/comps/div/Div";
import { Double } from "#app/services/double";
import { DoubleBetKind } from "@core/types/double/DoubleBetKind";
import { Vector } from "@client/comps/vector/Vector";
import "./DoubleBetIcon.scss";

export const DoubleIcon = ({
  className,
  betKind,
  bait,
  last100 = false
}: {
  className?: string;
  betKind: DoubleBetKind;
  bait?: boolean;
  last100?: boolean;
}) => {
  
  const icon = Double.getIconFromBetKind(betKind);

  return (
    <Div
      className={classNames("DoubleIcon", className, betKind, { bait })}
      center
      p={8}
    >
      {last100 ? <Div className="icon" />: <Vector className="icon" as={icon} size={16} />}
    </Div>
  );
};
