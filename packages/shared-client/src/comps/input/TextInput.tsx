import { FC } from "react";
import { InputBase, InputBaseProps } from "./InputBase";

export type TextInputProps = InputBaseProps;

export const TextInput: FC<TextInputProps> = (props) => {
  return <InputBase {...props} />;
};
