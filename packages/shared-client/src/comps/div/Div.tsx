import { FC } from "react";
import { Box, BoxProps } from "../box/Box";

export type DivProps = Omit<BoxProps<"div">, "as">;

export const Div: FC<DivProps> = ({ ...forwardProps }) => {
  return (
    <Box
      as="div"
      {...forwardProps}
    />
  );
};
