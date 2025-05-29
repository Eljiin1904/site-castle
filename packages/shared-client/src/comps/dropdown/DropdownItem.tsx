import { FC } from "react";
import classNames from "classnames";
import { Link, LinkProps } from "../link/Link";
import { Vector } from "../vector/Vector";
import { Span } from "../span/Span";
import { Div } from "../div/Div";
import "./DropdownItem.scss";
import { DropdownButtonProps } from "./DropdownButton";

export type DropdownItemProps = LinkProps & {
  iconLeft?: Svg;
  iconRight?: Svg;
  label: string;
  textColor?: Color;
  description?: string;
  active?: boolean;
  size?: DropdownButtonProps["size"];
};

export const DropdownItem: FC<DropdownItemProps> = ({
  className,
  iconLeft,
  iconRight,
  label,
  textColor,
  description,
  active,
  size = "md",
  ...forwardProps
}) => {
  return (
    <Link
      className={classNames("DropdownItem", className, size, { active })}
      hover="none"
      {...forwardProps}
      color={textColor || active ? "sand" : "dark-sand"}
    >
      {iconLeft && (
        <Vector
          className="icon left"
          as={iconLeft}
          size={description ? 30 : 16}
        />
      )}
      <Div
        column
        align="flex-start"
        gap={3}
      >
        <Span className="label">{label}</Span>
        {description && <Span size={12}>{description}</Span>}
      </Div>
      {iconRight && (
        <Vector
          className="icon right"
          as={iconRight}
          size={description ? 30 : 16}
        />
      )}
    </Link>
  );
};
