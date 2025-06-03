import { FC } from "react";
import { CustomDropdown, CustomDropdownProps } from "./CustomDropdown";
import { FilterDropdown, FilterDropdownProps } from "./FilterDropdown";
import { MenuDropdown, MenuDropdownProps } from "./MenuDropdown";
import { SelectDropdown, SelectDropdownProps } from "./SelectDropdown";
import { DisplayDropdown, DisplayDropdownProps } from "./DisplayDropdown";

export type DropdownProps =
  | ({ type: "custom" } & CustomDropdownProps)
  | ({ type: "filter" } & FilterDropdownProps)
  | ({ type: "menu" } & MenuDropdownProps)
  | ({ type: "display" } & DisplayDropdownProps)
  | ({ type: "select" } & SelectDropdownProps);

export const Dropdown: FC<DropdownProps> = (props) => {
  if (props.type === "custom") {
    const { type, ...forwardProps } = props;
    return <CustomDropdown {...forwardProps} />;
  } else if (props.type === "filter") {
    const { type, ...forwardProps } = props;
    return <FilterDropdown {...forwardProps} />;
  } else if (props.type === "menu") {
    const { type, ...forwardProps } = props;
    return <MenuDropdown {...forwardProps} />;
  } else if (props.type === "display") {
    const { type, ...forwardProps } = props;
    return <DisplayDropdown {...forwardProps} />;
  } else {
    const { type, ...forwardProps } = props;
    return <SelectDropdown {...forwardProps} />;
  }
};
