import { FC, useRef, useState } from "react";
import classNames from "classnames";
import { Div } from "../div/Div";
import { Span } from "../span/Span";
import { Styled, StyledLayoutProps } from "../styled/Styled";
import { Vector } from "../vector/Vector";
import "./InputBase.scss";

export type InputBaseProps = StyledLayoutProps & {
  type: "text" | "number" | "password" | "email";
  autoComplete?:
    | "email"
    | "username"
    | "new-password"
    | "current-password"
    | "one-time-code";
  placeholder: string;
  maxLength?: number;
  value: string | number | undefined;
  iconLeft?: Svg;
  iconRight?: Svg;
  iconColor?: Color;
  disabled?: boolean;
  error?: string;
  size?: "sm" | "lg";
  onChange: (value: string | undefined) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  onIconRightClick?: () => void;
};

export const InputBase: FC<InputBaseProps> = ({
  id,
  className,
  type,
  autoComplete,
  placeholder,
  maxLength,
  value,
  iconLeft,
  iconRight,
  iconColor,
  disabled,
  error,
  size,
  onChange,
  onFocus,
  onBlur,
  onIconRightClick,
  ...forwardProps
}) => {
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <Div
      className={classNames("Input", className, {
        disabled,
        focus: focused,
        lg: size === "lg",
        error: error !== undefined,
      })}
      fx
      onClick={() => {
        inputRef.current?.focus();
      }}
      {...forwardProps}
    >
      {iconLeft && (
        <Vector
          className="icon"
          as={iconLeft}
          size={16}
        />
      )}
      <Styled
        as="input"
        forwardRef={inputRef}
        id={id}
        type={type}
        autoComplete={autoComplete}
        maxLength={maxLength}
        placeholder={placeholder}
        value={value === undefined ? "" : value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value || undefined)}
        onFocus={() => {
          setFocused(true);
          onFocus && onFocus();
        }}
        onBlur={() => {
          setFocused(false);
          onBlur && onBlur();
        }}
      />
      {iconRight && (
        <Vector
          className="icon"
          as={iconRight}
          size={16}
          color={iconColor}
          hover={onIconRightClick ? "highlight" : "none"}
          cursor={disabled ? "not-allowed" : undefined}
          onClick={disabled ? undefined : onIconRightClick}
        />
      )}
      {error && (
        <Span
          className="error-text"
          fontSize={12}
        >
          {error}
        </Span>
      )}
    </Div>
  );
};
