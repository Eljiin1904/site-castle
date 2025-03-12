import { useState, useEffect, FC } from "react";
import { Numbers } from "@core/services/numbers";
import { InputBase, InputBaseProps } from "./InputBase";

export type DecimalInputProps = Omit<
  InputBaseProps,
  "type" | "value" | "onChange"
> & {
  decimals?: number;
  value: number | undefined;
  onChange: (x: number | undefined) => void;
};

export const DecimalInput: FC<DecimalInputProps> = ({
  decimals = 2,
  value,
  onChange,
  onBlur,
  ...forwardProps
}) => {
  const [rawValue, setRawValue] = useState<string | undefined>(
    value !== undefined ? value.toFixed(decimals) : "",
  );
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    if (!editing) {
      setRawValue(value !== undefined ? value.toFixed(decimals) : "");
    }
  }, [value, decimals, editing]);

  const handleChange = (input: string | undefined) => {
    if (input) {
      // Allow the user to type freely but still clean invalid characters
      input = input.replace(/([^0-9.]+)/gi, "");

      const splits = input.split(".");

      // Limit decimals, but only apply when input is fully formed
      if (splits.length > 1 && splits[1].length > decimals) {
        splits[1] = splits[1].substring(0, decimals);
        input = splits[0] + "." + splits[1];
      }

      // Set the raw value for the input (allow user to type freely)
      setRawValue(input);
      setEditing(true);
    } else {
      setRawValue("");
    }
  };

  const handleBlur = () => {
    if (rawValue === "0") {
      onChange(0);
    } else if (rawValue) {
      const parsedValue = Number.parseFloat(rawValue);

      if (isNaN(parsedValue)) {
        setRawValue("");
        onChange(undefined);
      } else {
        const roundedValue = Numbers.floor(parsedValue, decimals);

        setRawValue(roundedValue.toFixed(decimals));
        onChange(roundedValue);
      }
    } else {
      onChange(undefined);
    }

    setEditing(false);

    onBlur && onBlur();
  };

  return (
    <InputBase
      type="text"
      maxLength={14}
      value={rawValue}
      onChange={handleChange}
      onBlur={handleBlur}
      {...forwardProps}
    />
  );
};
