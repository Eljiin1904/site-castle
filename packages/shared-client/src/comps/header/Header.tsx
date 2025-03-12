import { FC } from "react";
import { Box, BoxProps } from "../box/Box";

export type HeaderProps = Omit<BoxProps<"header">, "as">;

export const Header: FC<HeaderProps> = (props) => {
  return (
    <Box
      as="header"
      {...props}
    />
  );
};
