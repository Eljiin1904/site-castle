import { FC } from "react";
import { Div, DivProps } from "../div/Div";

export type CardSectionProps = Omit<DivProps, "position"> & {
  position?: "header" | "middle" | "top" | "bottom";
};

export const CardSection: FC<CardSectionProps> = ({
  position = "middle",
  ...forwardProps
}) => {
  return (
    <Div
      fx
      px={16}
      py={14}
      bg="brown-6"
      borderLeft={position === "top" || position === "bottom"}
      borderRight={position === "top" || position === "bottom"}
      borderTop={position === "middle" || position === "top"}
      borderBottom={position === "bottom"}
      {...forwardProps}
    />
  );
};
