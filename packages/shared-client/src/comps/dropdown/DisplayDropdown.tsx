import { FC, useState } from "react";
import classNames from "classnames";
import { DropdownBase, DropdownBaseProps } from "./DropdownBase";
import { DropdownBody } from "./DropdownBody";
import { DropdownItem } from "./DropdownItem";
import { DropdownButton, DropdownButtonProps } from "./DropdownButton";
import { Div } from "../div/Div";

type Option =
  | string
  | number
  | {
      icon?: Svg;
      label: string;
      description?: string;
    };

export type DisplayDropdownProps = Omit<
  DropdownBaseProps,
  "body" | "button" | "open" | "onToggle"
> & {
  placeholder?: string;
  value: number | undefined;
  collapse?: boolean;
  size?: DropdownButtonProps["size"];
  options: Option[];
};

export const DisplayDropdown: FC<DisplayDropdownProps> = ({
  className,
  options,
  placeholder,
  value,
  collapse,
  size,
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
  };
  const currentInfo =
    value === undefined
      ? { label: placeholder || "Select a value..." }
      : getOptionInfo(options[value]);

  return (
    <DropdownBase
      {...forwardProps}
      className={classNames("DisplayDropdown", className)}
      clampHeight
      open={open}
      onToggle={setOpen}
      button={
        <DropdownButton
          label={currentInfo?.label}
          description={currentInfo?.description}
          placeholder={value === undefined}
          open={open}
          collapse={collapse}
          disabled={forwardProps.disabled}
          size={size}
        />
      }
      body={
        <Div fx>
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
        </Div>
      }
    />
  );
};
