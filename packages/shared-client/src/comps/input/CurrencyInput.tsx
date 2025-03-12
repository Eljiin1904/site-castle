import { FC } from "react";
import { Intimal } from "@core/services/intimal";
import { DecimalInput, DecimalInputProps } from "./DecimalInput";
import { SvgMoney } from "#client/svgs/common/SvgMoney";

export type CurrencyInputProps = Omit<DecimalInputProps, "decimals"> & {
  decimals?: 2 | 0;
};

export const CurrencyInput: FC<CurrencyInputProps> = ({
  decimals = 2,
  value,
  onChange,
  ...forwardProps
}) => {
  return (
    <DecimalInput
      decimals={decimals}
      iconLeft={SvgMoney}
      iconColor={"dark-sand"}
      value={value !== undefined ? Intimal.toDecimal(value, decimals) : undefined}
      onChange={(value) => onChange(value !== undefined ? Intimal.fromDecimal(value) : undefined)}
      {...forwardProps}
    />
  );
};
