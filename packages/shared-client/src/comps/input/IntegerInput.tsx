import { FC } from "react";
import { InputBase, InputBaseProps } from "./InputBase";

export type IntegerInputProps = Omit<
  InputBaseProps,
  "type" | "minLength" | "value" | "onChange"
> & {
  value: number | undefined;
  onChange: (x: number | undefined) => void;
};

export const IntegerInput: FC<IntegerInputProps> = ({
  value,
  onChange,
  ...forwardProps
}) => {
  return (
    <InputBase
      type="number"
      maxLength={12}
      value={value}
      onChange={(x) => onChange(x ? Number.parseInt(x) : undefined)}
      {...forwardProps}
    />
  );
};
