import { ElementType } from "react";
import classNames from "classnames";
import { Styled, StyledProps } from "../styled/Styled";
import "./LinkBase.scss";

export type LinkBaseProps<T extends ElementType> = StyledProps<T> & {
  onClick?: () => void;
};

export function LinkBase<T extends ElementType>({
  className,
  ...forwardProps
}: LinkBaseProps<T>) {
  return (
    <Styled
      className={classNames("Link", className)}
      display="inline-flex"
      hover="highlight"
      {...(forwardProps as StyledProps<T>)}
    />
  );
}
