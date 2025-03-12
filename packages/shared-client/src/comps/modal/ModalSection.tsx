import { FC } from "react";
import classNames from "classnames";
import { Div, DivProps } from "../div/Div";

export type ModalSectionProps = DivProps;

export const ModalSection: FC<ModalSectionProps> = ({
  className,
  children,
  ...forwardProps
}) => {
  return (
    <Div
      className={classNames("ModalSection", className)}
      column
      fx
      {...forwardProps}
    >
      {children}
    </Div>
  );
};
