import { FC } from "react";
import { AnchorLink, AnchorLinkProps } from "./AnchorLink";
import { NavLink, NavLinkProps } from "./NavLink";
import { RouterLink, RouterLinkProps } from "./RouterLink";
import { ActionLink, ActionLinkProps } from "./ActionLink";

export type LinkProps =
  | ({ type: "a" } & AnchorLinkProps)
  | ({ type: "action" } & ActionLinkProps)
  | ({ type: "router" } & RouterLinkProps)
  | ({ type: "nav" } & NavLinkProps);

export const Link: FC<LinkProps> = (props) => {
  if (props.type === "a") {
    const { type, ...forwardProps } = props;
    return <AnchorLink {...forwardProps} />;
  } else if (props.type === "action") {
    const { type, ...forwardProps } = props;
    return <ActionLink {...forwardProps} />;
  } else if (props.type === "nav") {
    const { type, ...forwardProps } = props;
    return <NavLink {...forwardProps} />;
  } else if (props.type === "router") {
    const { type, ...forwardProps } = props;
    return <RouterLink {...forwardProps} />;
  } else {
    return null;
  }
};
