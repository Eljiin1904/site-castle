import { FC } from "react";
import classNames from "classnames";
import { Div, DivProps } from "../div/Div";
import { Span } from "../span/Span";

export type ModalDividerProps = Omit<DivProps, "children"> & {
  label: string;
};

export const ModalDivider: FC<ModalDividerProps> = ({ className, label, ...forwardProps }) => {
  return (
    <Div
      className={classNames("ModalDivider", className)}
      center
      fx
      gap={8}
      {...forwardProps}
    >
      <Div
        grow
        borderTop
        borderColor="brown-4"
      />
      <Span
        size={13}
        color="dark-sand"
      >
        {label}
      </Span>
      <Div
        grow
        borderTop
        borderColor="brown-4"
      />
    </Div>
  );
};
