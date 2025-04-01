import { number } from "yup";
import { Intimal } from "#core/services/intimal";

export const currency = (name: string, max: number) => {
  return number()
    .integer({
      key: "validations:validations.number.integer",
      value: name,
    })
    .max(max, {
      key: 'validations:validations.tip.notEnoughTokens',
      value: {label: name, max}
    })
    .min(Intimal.fromDecimal(0.01),
      {
        key: "validations:validations.number.moreThan",
        value: { label: name, more: 0 },
      },
    )
    .required({
      key: "validations:validations.mixed.required",
      value: name,
    });
};
