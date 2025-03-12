import { FC } from "react";
import { Link as ReactRouterLink } from "react-router-dom";
import classNames from "classnames";
import { LinkBase, LinkBaseProps } from "./LinkBase";

export type RouterLinkProps = Omit<LinkBaseProps<typeof ReactRouterLink>, "as">;

export const RouterLink: FC<RouterLinkProps> = ({
  className,
  ...forwardProps
}) => {
  return (
    <LinkBase
      as={ReactRouterLink}
      className={classNames("RouterLink", className)}
      {...forwardProps}
    />
  );
};
