import { FC } from "react";
import classNames from "classnames";
import { Div, DivProps } from "../div/Div";
import './ModalField.scss';

export type ModalFieldProps = DivProps & {size?: "sm" | "md" | "lg"};

export const ModalField: FC<ModalFieldProps> = ({
  className,
  size = "md",
  children,
  ...forwardProps
}) => {
  return (
    <Div
      className={classNames("ModalField", className, {[`size-${size}`]: size})}
      fx   
      fontSize={12}
      color="dark-sand"
      bg="dark-brown"
      border
      borderColor="brown-4"
      {...forwardProps}
    >
      {children}
    </Div>
  );
};
