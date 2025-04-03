import { number } from "yup";
import { Intimal } from "#core/services/intimal";

export const currency = (name: string) => {
  return number()
    .integer({
      key: "validations.number.integer",
      value: name,
    })
    .min(Intimal.fromDecimal(0.01),
      {
        key: "validations.number.moreThan",
        value: { label: name, more: 0 },
      },
    )
    .required({
      key: "validations.mixed.required",
      value: name,
    });
};

export const currencyMax = (name: string, max: number) => {
  return number()
    .max(max,
      {
        key: "validations.tip.notEnoughTokens",
        value: { label: name, max: max },
      },
    )
    .required({
      key: "validations.mixed.required",
      value: name,
    });
};
