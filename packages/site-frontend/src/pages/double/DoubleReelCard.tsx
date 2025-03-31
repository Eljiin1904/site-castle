import classNames from "classnames";
import { DoubleColor } from "@core/types/double/DoubleColor";
import { Div } from "@client/comps/div/Div";
import "./DoubleReelCard.scss";
import { getIconFromBetKind } from "#app/services/double/Double";
import { Vector } from "@client/comps/vector/Vector";

export const DoubleReelCard = ({ index }: { index: number }) => {
  let icon;
  let color: DoubleColor;

  if (index === 1) {
    icon = getIconFromBetKind("green");
    color = "green";
  } else if (index === 2) {
    icon = getIconFromBetKind("bait");
    color = "red";
  } else if (index === 15) {
    icon = getIconFromBetKind("bait");
    color = "black";
  } else if (index % 2 === 0) {
    icon = getIconFromBetKind("red");
    color = "red";
  } else {
    icon = getIconFromBetKind("black");
    color = "black";
  }

  return (
    <Div
      className={classNames("DoubleReelCard", color)}
      center
    >
      <Vector className="icon" as={icon} size={40} />
    </Div>
  );
};
