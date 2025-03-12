import { FC } from "react";
import { DropdownBase, DropdownBaseProps } from "./DropdownBase";

export type CustomDropdownProps = DropdownBaseProps;

export const CustomDropdown: FC<CustomDropdownProps> = (props) => {
  return <DropdownBase {...props} />;
};
