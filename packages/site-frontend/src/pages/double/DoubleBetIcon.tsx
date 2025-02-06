import classNames from "classnames";
import { DoubleBetKind } from "@core/types/double/DoubleBetKind";
import { Div } from "@client/comps/div/Div";
import { Vector } from "@client/comps/vector/Vector";
import { Double } from "#app/services/double";
import "./DoubleBetIcon.scss";

export const DoubleBetIcon = ({ betKind }: { betKind: DoubleBetKind }) => {
  const icon = Double.getIconFromBetKind(betKind);

  return (
    <Div
      className={classNames("DoubleBetIcon", betKind)}
      center
      p={8}
    >
      <Vector
        className="icon"
        as={icon}
        size={16}
      />
    </Div>
  );
};
