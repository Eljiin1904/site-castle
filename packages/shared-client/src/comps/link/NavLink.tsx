import { FC } from "react";
import { NavLink as ReactNavLink, useLocation } from "react-router-dom";
import classNames from "classnames";
import { LinkBase, LinkBaseProps } from "./LinkBase";

export type NavLinkProps = Omit<
  LinkBaseProps<typeof ReactNavLink>,
  "as" | "className"
> & {
  className?: string;
};

export const NavLink: FC<NavLinkProps> = ({
  className,
  to,
  ...forwardProps
}) => {
  const location = useLocation();
  const pathname = typeof to === "string" ? to : to.pathname;
  const hash = typeof to === "string" ? "" : to.hash;
  const tactive = pathname === location.pathname && hash === location.hash;

  return (
    <LinkBase
      as={ReactNavLink}
      className={classNames("NavLink", className, { tactive })}
      to={to}
      {...forwardProps}
    />
  );
};
