import { FC, createElement } from "react";
import classNames from "classnames";
import { DivProps, Div } from "../div/Div";
import "./Vector.scss";

export type VectorProps = Omit<DivProps, "children" | "width" | "height"> & {
  as: Svg;
  size?: number;
  width?: string | number;
  height?: string | number;
  preserveAspectRatio?: "xMaxYMid meet" | "xMinYMid meet";
};

export const Vector: FC<VectorProps> = ({
  className,
  as,
  size = 16,
  width = size,
  height = size,
  preserveAspectRatio,
  // color = 'dark-sand',
  ...forwardProps
}) => {
  return (
    <Div
      className={classNames("Vector", className)}
      display="inline-flex"
      center
       color={forwardProps.color ?? "dark-sand"}
      {...forwardProps}
    >
      {createElement(as, {
        width,
        height,
        preserveAspectRatio,
      })}
    </Div>
  );
};
