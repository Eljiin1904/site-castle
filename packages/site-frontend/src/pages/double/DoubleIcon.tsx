import classNames from "classnames";
import { DoubleColor } from "@core/types/double/DoubleColor";
import { Div } from "@client/comps/div/Div";
import { Double } from "#app/services/double";
import "./DoubleIcon.scss";
import { Img } from "@client/comps/img/Img";

export const DoubleIcon = ({
  className,
  color,
  bait,
}: {
  className?: string;
  color: DoubleColor;
  bait: boolean;
}) => {
  const path = Double.getImageFromColor({ color, bait });

  return (
    <Div
      className={classNames("DoubleIcon", className, color, { bait })}
      center
      p={8}
    >
      <Img
        type="png"
        className="icon"
        path={path}
        width="20px"
      />
    </Div>
  );
};
