import { FC } from "react";
import { Box, BoxProps } from "../box/Box";

export type NavProps = Omit<BoxProps<"nav">, "as">;

export const Nav: FC<NavProps> = (props) => {
  return (
    <Box
      as="nav"
      {...props}
    />
  );
};
