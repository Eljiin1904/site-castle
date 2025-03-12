import { FC } from "react";
import { Box, BoxProps } from "../box/Box";

export type MainProps = Omit<BoxProps<"main">, "as">;

export const Main: FC<MainProps> = (props) => {
  return (
    <Box
      as="main"
      {...props}
    />
  );
};
