import { FC, RefObject } from "react";
import classNames from "classnames";
import TextareaAutosize from "react-textarea-autosize";
import { Div } from "../div/Div";
import { StyledLayoutProps } from "../styled/Styled";
import "./TextArea.scss";

export type TextAreaProps = StyledLayoutProps & {
  placeholder: string;
  minLength?: number;
  maxLength?: number;
  minRows?: number;
  maxRows?: number;
  value: string | undefined;
  disabled?: boolean;
  onChange: (value: string) => void;
  onSubmit?: () => void;
  forwardRef?: RefObject<HTMLTextAreaElement>;
};

export const TextArea: FC<TextAreaProps> = ({
  id,
  className,
  placeholder,
  minLength,
  maxLength,
  minRows,
  maxRows,
  value,
  disabled,
  onChange,
  onSubmit,
  forwardRef,
  ...forwardProps
}) => {
  const handleEnter = (e: React.KeyboardEvent<HTMLElement>) => {
    if (onSubmit && e.key === "Enter") {
      e.preventDefault();
      onSubmit();
    }
  };

  return (
    <Div
      className={classNames("TextArea", className, {
        disabled,
      })}
      {...forwardProps}
    >
      <TextareaAutosize
        id={id}
        minRows={minRows}
        maxRows={maxRows}
        minLength={minLength}
        maxLength={maxLength}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleEnter}
        ref={forwardRef}
        disabled={disabled}
      />
    </Div>
  );
};
