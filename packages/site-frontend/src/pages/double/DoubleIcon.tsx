import classNames from "classnames";
import { DoubleColor } from "@core/types/double/DoubleColor";
import { Div } from "@client/comps/div/Div";
import { Vector } from "@client/comps/vector/Vector";
import { Double } from "#app/services/double";
import "./DoubleIcon.scss";

export const DoubleIcon = ({
  className,
  color,
  bait,
}: {
  className?: string;
  color: DoubleColor;
  bait: boolean;
}) => {
  const icon = Double.getIconFromColor({ color, bait });

  return (
    <Div
      className={classNames("DoubleIcon", className, color, { bait })}
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
