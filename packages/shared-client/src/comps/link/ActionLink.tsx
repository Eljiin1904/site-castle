import { FC } from "react";
import classNames from "classnames";
import { LinkBase, LinkBaseProps } from "./LinkBase";

export type ActionLinkProps = Omit<LinkBaseProps<"div">, "as" | "onClick"> & {
  onClick: () => void;
};

export const ActionLink: FC<ActionLinkProps> = ({
  className,
  onClick,
  ...forwardProps
}) => {
  return (
    <LinkBase
      as="div"
      className={classNames("ActionLink", className)}
      onClick={onClick}
      {...forwardProps}
    />
  );
};
