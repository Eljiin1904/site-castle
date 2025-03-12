import { FC, useState } from "react";
import classNames from "classnames";
import { LinkProps } from "../link/Link";
import { DropdownBase, DropdownBaseProps } from "./DropdownBase";
import { DropdownBody } from "./DropdownBody";
import { DropdownItem } from "./DropdownItem";
import { DropdownButton } from "./DropdownButton";

export type MenuDropdownProps = Omit<
  DropdownBaseProps,
  "body" | "button" | "open" | "onToggle"
> & {
  button: JSX.Element | string;
  options: (LinkProps & {
    label: string;
    iconLeft?: Svg;
    iconRight?: Svg;
  })[];
};

export const MenuDropdown: FC<MenuDropdownProps> = ({
  className,
  button,
  options,
  ...forwardProps
}) => {
  const [open, setOpen] = useState(false);
  return (
    <DropdownBase
      {...forwardProps}
      className={classNames("MenuDropdown", className)}
      clampHeight
      open={open}
      onToggle={setOpen}
      button={
        typeof button === "string" ? (
          <DropdownButton
            label={button}
            open={open}
          />
        ) : (
          button
        )
      }
      body={
        <DropdownBody>
          {options.map(({ onClick, ...itemProps }, i) => (
            <DropdownItem
              {...itemProps}
              key={i}
              onClick={() => {
                setOpen(false);
                onClick && onClick();
              }}
            />
          ))}
        </DropdownBody>
      }
    />
  );
};
