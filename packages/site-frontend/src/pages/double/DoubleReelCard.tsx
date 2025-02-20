import classNames from "classnames";
import { DoubleColor } from "@core/types/double/DoubleColor";
import { Div } from "@client/comps/div/Div";
import "./DoubleReelCard.scss";
import { Img } from "@client/comps/img/Img";
import { getImageFromBetKind } from "#app/services/double/Double";

export const DoubleReelCard = ({ index }: { index: number }) => {
  let path;
  let color: DoubleColor;

  if (index === 1) {
    path = getImageFromBetKind("green");
    color = "green";
  } else if (index === 2) {
    path = getImageFromBetKind("bait");
    color = "yellow";
  } else if (index === 15) {
    path = getImageFromBetKind("bait");
    color = "yellow";
  } else if (index % 2 === 0) {
    path = getImageFromBetKind("red");
    color = "red";
  } else {
    path = getImageFromBetKind("black");
    color = "black";
  }

  return (
    <Div
      className={classNames("DoubleReelCard", color)}
      center
      py={8}
      px={12}
    >
      <Img
        type="png"
        path={path}
        width="100px"
      />
    </Div>
  );
};
