import { FC } from "react";
import classNames from "classnames";
import { DivProps, Div } from "../div/Div";
import "./Placeholder.scss";

export type PlaceholderProps = Omit<DivProps, "children">;

export const Placeholder: FC<PlaceholderProps> = ({
  className,
  ...forwardProps
}) => {
  return (
    <Div
      className={classNames("Placeholder", className)}
      fx
      fy
      bg="brown-6"
      border
      {...forwardProps}
    />
  );
};
