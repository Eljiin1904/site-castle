import { FC } from "react";
import { Div, DivProps } from "../div/Div";

export type CardSectionProps = Omit<DivProps, "position"> & {
  position?: "header" | "middle" | "top" | "bottom" | "none";
};

export const CardSection: FC<CardSectionProps> = ({
  position = "middle",
  px = 24,
  py = 16,
  ...forwardProps
}) => {
  return (
    <Div
      fx
      px={px}
      py={py}
      borderLeft={position === "top" || position === "bottom"}
      borderRight={position === "top" || position === "bottom"}
      borderTop={position === "middle" || position === "top"}
      borderBottom={position === "bottom" || position === "header"}
      borderColor="brown-4"
      {...forwardProps}
    />
  );
};
