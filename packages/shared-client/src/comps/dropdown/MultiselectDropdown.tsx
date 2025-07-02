import { FC, useState } from "react";
import classNames from "classnames";
import { DropdownBase, DropdownBaseProps } from "./DropdownBase";
import { DropdownButton, DropdownButtonProps } from "./DropdownButton";
import { DropdownBody } from "./DropdownBody";
import { Div } from "../div/Div";
import { Checkbox } from "../checkbox/Checkbox";
import { Span } from "../span/Span";

type Option =
  | string
  | number
  | {
      icon?: Svg;
      label: string;
      description?: string;
    };

export interface MultiselectDropdownProps
  extends Omit<DropdownBaseProps, "button" | "body" | "open" | "onToggle"> {
  buttonKind?: DropdownButtonProps["kind"];
  placeholder?: string;
  icon?: Svg;
  tag?: string;
  options: Option[];
  value: string[] | undefined;
  collapse?: boolean;
  size?: DropdownButtonProps["size"];
  onChange: (x: string) => void;
}

export const MultiselectDropdown: FC<MultiselectDropdownProps> = ({
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

  const onItemClick = (x: string) => {
    onChange(x);
  };

  return (
    <DropdownBase
      {...forwardProps}
      className={classNames("SelectDropdown", className)}
      clampHeight
      open={open && !forwardProps.disabled}
      onToggle={setOpen}
      button={
        <DropdownButton
          icon={icon}
          tag={tag}
          label={``}
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
            const active = value?.findIndex((v) => v === info.label) !== -1;
            return (<Div key={info.label} gap={4} alignItems="center" className={classNames("DropdownItem", className, size, { active })}>
                <Checkbox
                  key={i}
                  label={info.label}
                  value={value?.findIndex((v) => v === info.label) !== -1}
                  onChange={() => onItemClick(info.label)}
                  className="MultiselectDropdownItem"
                />
               {info.description && <Span bg="dark-brown" fontSize={10} px={4}>{info.description}</Span>}
            </Div>);
          })}
        </DropdownBody>
      }
    />
  );
};
