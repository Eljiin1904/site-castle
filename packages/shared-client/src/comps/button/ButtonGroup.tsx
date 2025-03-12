import { FC } from "react";
import classNames from "classnames";
import { Div } from "../div/Div";
import { Button, ButtonProps } from "./Button";
import { StyledLayoutProps } from "../styled/Styled";
import "./ButtonGroup.scss";

export type ButtonGroupProps = StyledLayoutProps & {
  options: string[];
  value: number;
  size?: ButtonProps["size"];
  labelSize?: ButtonProps["labelSize"];
  fill?: boolean;
  disabled?: boolean;
  setValue: (x: number) => void;
};

export const ButtonGroup: FC<ButtonGroupProps> = ({
  className,
  options,
  value,
  size,
  labelSize,
  fill,
  disabled,
  setValue,
  ...forwardProps
}) => {
  return (
    <Div
      className={classNames("ButtonGroup", className)}
      overflow="auto"
      {...forwardProps}
    >
      {options.map((x, i) => (
        <OptionButton
          key={x}
          label={x}
          active={value === i}
          size={size}
          labelSize={labelSize}
          fill={fill}
          disabled={disabled}
          onClick={() => setValue(i)}
        />
      ))}
    </Div>
  );
};

const OptionButton = ({
  label,
  active,
  size,
  labelSize,
  disabled,
  fill,
  onClick,
}: {
  label: string;
  active: boolean;
  size?: ButtonProps["size"];
  labelSize?: ButtonProps["labelSize"];
  fill: boolean | undefined;
  disabled: boolean | undefined;
  onClick: () => void;
}) => {
  return (
    <Button
      className={classNames("tertiary-grey", { active })}
      kind="tertiary-grey"
      fx={fill}
      size={size}
      label={label}
      // labelSize={labelSize}
      // labelWeight="medium"
      // labelColor={active ? "yellow" : "dark-sand"}
      disabled={disabled}
      onClick={onClick}
    />
  );
};