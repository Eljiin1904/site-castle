import { FC } from "react";
import classNames from "classnames";
import { Div, DivProps } from "../div/Div";

export type ModalFieldProps = DivProps;

export const ModalField: FC<ModalFieldProps> = ({
  className,
  children,
  ...forwardProps
}) => {
  return (
    <Div
      className={classNames("ModalField", className)}
      fx
      px={12}
      py={11}
      fontSize={14}
      fontWeight="medium"
      color="gray"
      bg="brown-8"
      border
      borderColor="brown-5"
      {...forwardProps}
    >
      {children}
    </Div>
  );
};
