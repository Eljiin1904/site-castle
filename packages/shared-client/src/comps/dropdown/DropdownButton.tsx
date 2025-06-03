import { FC } from "react";
import classNames from "classnames";
import { SvgCaretDown } from "#client/svgs/common/SvgCaretDown";
import { SvgCaretUp } from "#client/svgs/common/SvgCaretUp";
import { Styled } from "../styled/Styled";
import { Span } from "../span/Span";
import { Vector } from "../vector/Vector";
import { Div } from "../div/Div";
import "./DropdownButton.scss";

export type DropdownButtonProps = {
  className?: string;
  kind?: "dark" | "secondary";
  size?: "sm" | "md" | "lg";
  icon?: Svg;
  tag?: string;
  color?: Color;
  label: string;
  description?: string;
  placeholder?: boolean;
  open: boolean;
  collapse?: boolean;
  disabled?: boolean;
  onClick?: () => void;
};

export const DropdownButton: FC<DropdownButtonProps> = ({
  className,
  kind = "dark",
  size = "md",
  color,
  icon,
  tag,
  label,
  description,
  placeholder,
  open,
  collapse,
  disabled,
  onClick,
}) => {
  const expand = description !== undefined;
  return (
    <Styled
      as="button"
      className={classNames("DropdownButton", className, kind, size, {
        placeholder,
        collapse,
        open,
        disabled,
        expand,
      })}
      type="button"
      fx
      pl={12}
      pr={10}
      gap={collapse ? 4 : 12}
      onClick={onClick}
    >
      {icon && (
        <Vector
          className="icon"
          as={icon}
          size={description ? 30 : 16}
        />
      )}
      {tag && <Span className="tag"> {tag}</Span>}
      {!collapse && (
        <Div
          column
          align="flex-start"
          gap={3}
        >
          <Span
            className="label"
            color={color || "white"}
          >
            {label}
          </Span>
          {description && <Span size={12}>{description}</Span>}
        </Div>
      )}
      <Div
        grow
        justify="flex-end"
      >
        <Vector
          className="icon"
          as={open ? SvgCaretUp : SvgCaretDown}
          size={16}
        />
      </Div>
    </Styled>
  );
};
