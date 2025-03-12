import { FC } from "react";
import classNames from "classnames";
import { SvgSpinner } from "#client/svgs/common/SvgSpinner";
import { VectorProps, Vector } from "../vector/Vector";
import "./Spinner.scss";

export type SpinnerProps = Omit<VectorProps, "as">;

export const Spinner: FC<SpinnerProps> = ({ className, ...forwardProps }) => {
  return (
    <Vector
      as={SvgSpinner}
      className={classNames("Spinner", className)}
      color="gray"
      {...forwardProps}
    />
  );
};
