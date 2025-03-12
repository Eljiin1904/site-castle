import { number } from "yup";
import { Intimal } from "#core/services/intimal";

export const currency = (name: string) => {
  return number()
    .integer(`${name} must be an integer.`)
    .min(Intimal.fromDecimal(0.01), `${name} must greater than 0.`)
    .required(`${name} is required.`);
};
