import { FC, useState } from "react";
import classNames from "classnames";
import { DropdownBase, DropdownBaseProps } from "./DropdownBase";
import { DropdownButton, DropdownButtonProps } from "./DropdownButton";
import { DropdownBody } from "./DropdownBody";
import { DropdownItem } from "./DropdownItem";

type Option =
  | string
  | number
  | {
      icon?: Svg;
      label: string;
      description?: string;
    };

export interface SelectDropdownProps
  extends Omit<DropdownBaseProps, "button" | "body" | "open" | "onToggle"> {
  buttonKind?: DropdownButtonProps["kind"];
  placeholder?: string;
  icon?: Svg;
  tag?: string;
  options: Option[];
  value: number | undefined;
  collapse?: boolean;
  size?: DropdownButtonProps["size"];
  onChange: (x: string, i: number) => void;
}

export const SelectDropdown: FC<SelectDropdownProps> = ({
  className,
  buttonKind,
  placeholder,
  icon,
  tag,
  options,
  value,
  collapse,
  size,
  onChange,
  ...forwardProps
}) => {
  const [open, setOpen] = useState(false);

  const getOptionInfo = (x: Option) => {
    if (typeof x === "string" || typeof x === "number") {
      return { label: x.toString() };
    } else {
      return x;
    }
  };

  const onItemClick = (x: string, i: number) => {
    setOpen(false);
    onChange(x, i);
  };

  const currentInfo =
    value === undefined
      ? { label: placeholder || "Select a value..." }
      : getOptionInfo(options[value]);

  return (
    <DropdownBase
      {...forwardProps}
      className={classNames("SelectDropdown", className)}
      clampHeight
      open={open && !forwardProps.disabled}
      onToggle={setOpen}
      button={
        <DropdownButton
          // kind={buttonKind}
          icon={icon ?? currentInfo.icon}
          tag={tag}
          label={currentInfo.label}
          description={currentInfo.description}
          placeholder={value === undefined}
          open={open}
          collapse={collapse}
          disabled={forwardProps.disabled}
          size={size}
        />
      }
      body={
        <DropdownBody>
          {options.map((x, i) => {
            const info = getOptionInfo(x);
            return (
              <DropdownItem
                key={i}
                type="action"
                label={info.label}
                description={info.description}
                iconLeft={info.icon}
                active={value === i}
                onClick={() => onItemClick(info.label, i)}
                size={size}
              />
            );
          })}
        </DropdownBody>
      }
    />
  );
};
