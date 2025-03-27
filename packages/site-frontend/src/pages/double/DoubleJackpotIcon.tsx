import classNames from "classnames";
import { Div } from "@client/comps/div/Div";
import { Double } from "#app/services/double";
import { Vector } from "@client/comps/vector/Vector";
import "./DoubleJackpotIcon.scss";

export const DoubleJackpotIcon = ({
  fill
}: {
  fill?: boolean;
}) => {
  
  const icon = Double.getIconFromBetKind('green');
  return (
    <Div
      className={classNames("DoubleJackpotIcon", { fill })}
      center
      p={12}
      height={40}
    >
      <Vector className="icon" as={icon} size={16} />
    </Div>
  );
};
