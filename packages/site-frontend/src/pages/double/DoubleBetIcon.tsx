import classNames from "classnames";
import { DoubleBetKind } from "@core/types/double/DoubleBetKind";
import { Div } from "@client/comps/div/Div";
import { Double } from "#app/services/double";
import "./DoubleBetIcon.scss";
import { Img } from "@client/comps/img/Img";

export const DoubleBetIcon = ({ betKind }: { betKind: DoubleBetKind }) => {
  const path = Double.getImageFromBetKind(betKind);

  return (
    <Div
      className={classNames("DoubleBetIcon", betKind)}
      center
      p={8}
    >
      <Img
        type="png"
        path={path}
        width="25px"
      />
    </Div>
  );
};
