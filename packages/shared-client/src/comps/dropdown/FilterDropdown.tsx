import { FC, useState } from "react";
import classNames from "classnames";
import { DropdownBase, DropdownBaseProps } from "./DropdownBase";
import { DropdownButton, DropdownButtonProps } from "./DropdownButton";
import { DropdownBody } from "./DropdownBody";
import { DropdownItem } from "./DropdownItem";

export type FilterDropdownProps = Omit<
  DropdownBaseProps,
  "button" | "body" | "open" | "onToggle"
> & {
  buttonKind?: DropdownButtonProps["kind"];
  label: string;
  icon?: Svg;
  tag?: string;
  size?: DropdownButtonProps["size"];
  options: string[] | { label: string; icon?: Svg }[];
  filter: boolean[];
  collapse?: boolean;
  onChange: (x: boolean[]) => void;
};

export const FilterDropdown: FC<FilterDropdownProps> = ({
  className,
  buttonKind,
  label,
  icon,
  tag,
  size,
  options,
  filter,
  collapse,
  onChange,
  ...forwardProps
}) => {
  const [open, setOpen] = useState(!forwardProps.disabled);

  const getOptionInfo = (x: string | { icon?: Svg; label: string }) => {
    if (typeof x === "string") {
      return { label: x, icon: undefined };
    } else {
      return x;
    }
  };

  const onItemClick = (x: string, i: number) => {
    setOpen(false);
    filter[i] = !filter[i];
    onChange([...filter]);
  };

  return (
    <DropdownBase
      {...forwardProps}
      className={classNames("FilterDropdown", className)}
      clampHeight
      open={open && !forwardProps.disabled}
      onToggle={setOpen}
      button={
        <DropdownButton
          kind={buttonKind}
          icon={icon}
          label={options.filter((_, i) => filter[i]).join(", ") || label}
          open={open}
          collapse={collapse}
          tag={tag}
          size={size}
          disabled={forwardProps.disabled}
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
                iconLeft={info.icon}
                active={filter[i]}
                onClick={() => onItemClick(info.label, i)}
              />
            );
          })}
        </DropdownBody>
      }
    />
  );
};
