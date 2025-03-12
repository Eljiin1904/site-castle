import { number } from "yup";

export const integer = (name: string) => {
  return number()
    .integer(`${name} must be an integer.`)
    .required(`${name} is required.`);
};
