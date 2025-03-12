import { FC } from "react";
import classNames from "classnames";
import { SvgCheck } from "#client/svgs/common/SvgCheck";
import { Div } from "../div/Div";
import { Styled, StyledLayoutProps } from "../styled/Styled";
import { Vector } from "../vector/Vector";
import { Span } from "../span/Span";
import "./Checkbox.scss";

export type CheckboxProps = StyledLayoutProps & {
  bg?: boolean;
  label?: string | Svg;
  value: boolean | undefined;
  disabled?: boolean;
  error?: string;
  onChange: (v: boolean) => void;
};

export const Checkbox: FC<CheckboxProps> = ({
  className,
  bg,
  label,
  value,
  disabled,
  error,
  onChange,
  ...forwardProps
}) => {
  return (
    <Div
      className={classNames("Checkbox", className, {
        bg: bg === true,
        error: error !== undefined,
      })}
      {...forwardProps}
    >
      <Styled
        as="button"
        type="button"
        className={classNames("check-button", { active: value })}
        disabled={disabled}
        onClick={() => onChange(!value)}
      >
        {value && (
          <Vector
            className="check-icon"
            as={SvgCheck}
            size={16}
          />
        )}
      </Styled>
      {label && (
        <Div
          className="label"
          ml={16}
        >
          {typeof label === "string" ? (
            label
          ) : (
            <Vector
              as={label}
              size={16}
            />
          )}
        </Div>
      )}
      {error && (
        <Span
          className="error-text">
          {error}
        </Span>
      )}
    </Div>
  );
};
