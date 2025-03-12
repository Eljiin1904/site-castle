import { FC } from "react";
import { CurrencyInput, CurrencyInputProps } from "./CurrencyInput";
import { DateInput, DateInputProps } from "./DateInput";
import { DecimalInput, DecimalInputProps } from "./DecimalInput";
import { DobInput, DobInputProps } from "./DobInput";
import { ImageInput, ImageInputProps } from "./ImageInput";
import { IntegerInput, IntegerInputProps } from "./IntegerInput";
import { PasswordInput, PasswordInputProps } from "./PasswordInput";
import { TextInput, TextInputProps } from "./TextInput";
import { SecureTextInput, SecureTextInputProps } from "./SecureTextInput";

export type InputProps =
  | ({ type: "currency" } & CurrencyInputProps)
  | ({ type: "date" } & DateInputProps)
  | ({ type: "decimal" } & DecimalInputProps)
  | ({ type: "dob" } & DobInputProps)
  | ({ type: "image" } & ImageInputProps)
  | ({ type: "integer" } & IntegerInputProps)
  | ({ type: "password" } & PasswordInputProps)
  | ({ type: "secure-text" } & SecureTextInputProps)
  | ({ type: "text" | "number" | "email" } & TextInputProps);

export const Input: FC<InputProps> = (props) => {
  if (props.type === "currency") {
    const { type, ...forwardProps } = props;
    return <CurrencyInput {...forwardProps} />;
  } else if (props.type === "date") {
    const { type, ...forwardProps } = props;
    return <DateInput {...forwardProps} />;
  } else if (props.type === "decimal") {
    const { type, ...forwardProps } = props;
    return <DecimalInput {...forwardProps} />;
  } else if (props.type === "dob") {
    const { type, ...forwardProps } = props;
    return <DobInput {...forwardProps} />;
  } else if (props.type === "image") {
    const { type, ...forwardProps } = props;
    return <ImageInput {...forwardProps} />;
  } else if (props.type === "integer") {
    const { type, ...forwardProps } = props;
    return <IntegerInput {...forwardProps} />;
  } else if (props.type === "password") {
    const { type, ...forwardProps } = props;
    return <PasswordInput {...forwardProps} />;
  } else if (props.type === "secure-text") {
    const { ...forwardProps } = props;
    return <SecureTextInput {...forwardProps} />;
  } else {
    const { ...forwardProps } = props;
    return <TextInput {...forwardProps} />;
  }
};
