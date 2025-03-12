import { FC } from "react";
import { Box, BoxProps } from "../box/Box";

export type FooterProps = Omit<BoxProps<"footer">, "as">;

export const Footer: FC<FooterProps> = (props) => {
  return (
    <Box
      as="footer"
      {...props}
    />
  );
};
