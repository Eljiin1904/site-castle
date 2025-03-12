import { FC } from "react";
import classNames from "classnames";
import { LinkBase, LinkBaseProps } from "./LinkBase";

export type AnchorLinkProps = Omit<LinkBaseProps<"a">, "as"> & {
  href: string;
  icon?: Svg;
};

export const AnchorLink: FC<AnchorLinkProps> = ({ className, ...forwardProps }) => {
  return (
    <LinkBase
      as="a"
      className={classNames("AnchorLink", className)}
      target="_blank"
      rel="noopener noreferrer"
      {...forwardProps}
    />
  );
};
