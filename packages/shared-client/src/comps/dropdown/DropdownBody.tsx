import { FC } from "react";
import { Div, DivProps } from "../div/Div";

export type DropdownProps = DivProps;

export const DropdownBody: FC<DropdownProps> = ({
  children,
  ...forwardProps
}) => {
  return (
    <Div
      fx
      fy
      column
      bg="brown-4"
      border
      {...forwardProps}
    >
      {children}
    </Div>
  );
};
