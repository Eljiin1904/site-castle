import { FC } from "react";
import { Div, DivProps } from "../div/Div";

export type CardProps = DivProps;

export const Card: FC<CardProps> = ({ ...forwardProps }) => {
  return (
    <Div
      fx
      bg="brown-6"
      border
      {...forwardProps}
    />
  );
};
