import { FC } from "react";
import classNames from "classnames";
import { Div, DivProps } from "../div/Div";
import { ModalFieldError } from "./ModalFieldError";

import "./ModalField.scss";

export type ModalFieldProps = DivProps & { size?: "sm" | "md" | "lg"; error?: string | undefined };

export const ModalField: FC<ModalFieldProps> = ({
  className,
  error,
  size = "md",
  children,
  ...forwardProps
}) => {
  return (
    <Div
      className={classNames("ModalField", className, { [`size-${size}`]: size })}
      fx
      fontSize={12}
      color="dark-sand"
      bg="dark-brown"
      border
      borderColor="brown-4"
      {...forwardProps}
    >
      {children}
      <ModalFieldError error={error} />
    </Div>
  );
};
