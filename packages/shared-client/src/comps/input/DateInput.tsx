import { FC } from "react";
import ReactDatePicker from "react-datepicker";
import classNames from "classnames";
import { SvgHistory } from "#client/svgs/common/SvgHistory";
import { Div } from "../div/Div";
import { Span } from "../span/Span";
import { Vector } from "../vector/Vector";
import { StyledLayoutProps } from "../styled/Styled";
import "react-datepicker/dist/react-datepicker.css";
import "./DateInput.scss";

export type DateInputProps = StyledLayoutProps & {
  placeholder: string;
  format: string;
  showTimeSelect?: boolean;
  showTimeSelectOnly?: boolean;
  value: Date | undefined;
  disabled?: boolean;
  error?: string;
  onChange: (x: Date) => void;
};

export const DateInput: FC<DateInputProps> = ({
  className,
  placeholder,
  format,
  showTimeSelect,
  showTimeSelectOnly,
  value,
  disabled,
  error,
  onChange,
  ...forwardProps
}) => {
  return (
    <Div
      className={classNames("Input DateInput", className, {
        disabled,
        error: error !== undefined,
      })}
      fx
      {...forwardProps}
    >
      <Vector
        className="icon"
        as={SvgHistory}
        size={16}
      />
      <ReactDatePicker
        dateFormat={format}
        showTimeSelect={showTimeSelect}
        showTimeSelectOnly={showTimeSelectOnly}
        placeholderText={placeholder}
        selected={value}
        disabled={disabled}
        onChange={onChange}
      />
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
