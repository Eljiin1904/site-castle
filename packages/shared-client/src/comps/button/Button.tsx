import { FC, Fragment } from "react";
import classNames from "classnames";
import { Span } from "../span/Span";
import { Spinner } from "../spinner/Spinner";
import { Box } from "../box/Box";
import { Vector } from "../vector/Vector";
import { StyledLayoutProps, StyledProps } from "../styled/Styled";
import "./Button.scss";

export type ButtonProps = StyledLayoutProps & {
  type?: "button" | "submit";
  kind: "primary" | "secondary" | "tertiary" | "quaternary"| "quinary" | "custom" | "primary-green" |
   "primary-black" | "secondary-black" | "primary-yellow" | "secondary-yellow" | "tertiary-grey" | "tertiary-black-overlay" | "tertiary-white-overlay";
  size?: "xs" | "sm" | "md" | "lg" | "sso" | 'xssso';
  label?: string;
  labelSize?: Unit;
  labelWeight?: StyledProps["fontWeight"];
  labelColor?: StyledProps["color"];
  icon?: Svg;
  iconLeft?: Svg;
  iconRight?: Svg;
  iconSize?: Unit;
  loading?: boolean;
  disabled?: boolean;
  children?: any;
  title?: string;
  boxShadow?: StyledProps["boxShadow"];
  bg?: StyledProps["bg"];
  borderColor?: StyledProps["borderColor"];
  border?: StyledProps["border"];
  borderRadius?: StyledProps["borderRadius"];
  color?: StyledProps["color"];
  onClick?: () => void;
};

export const Button: FC<ButtonProps> = ({
  className,
  type = "button",
  kind,
  size = "md",
  label,
  labelSize = 14,
  labelWeight = "thin",
  labelColor = "light-sand",
  icon,
  iconLeft = icon,
  iconRight,
  iconSize = 16,
  loading,
  disabled,
  fx,
  children,
  ...forwardProps
}) => {
  const square = !fx && !label && (iconLeft || iconRight);

  let content;

  if (loading) {
    content = (
      <Spinner
        className="icon"
        size={iconSize}
      />
    );
  } else {
    content = (
      <Fragment>
        {iconLeft && (
          <Vector
            className="icon"
            as={iconLeft}
            size={iconSize}
          />
        )}
        {label && (
          <Span
            className="label"
            fontSize={labelSize}
            fontWeight={labelWeight}
            color={labelColor}
          >
            {label}
          </Span>
        )}
        {iconRight && (
          <Vector
            className="icon"
            as={iconRight}
            size={iconSize}
          />
        )}
        {children}
      </Fragment>
    );
  }

  return (
    <Box
      as="button"
      className={classNames("Button", className, kind, {
        [`size-${size}`]: size,
        square,
        loading,
      })}
      type={type}
      disabled={disabled || loading}
      fx={fx}
      {...forwardProps}
    >
      {content}
    </Box>
  );
};