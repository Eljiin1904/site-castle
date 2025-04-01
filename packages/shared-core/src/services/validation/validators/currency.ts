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
