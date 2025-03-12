import { number } from "yup";

export const limit = (name: string = "Limit") => {
  return number()
    .integer(`${name} must be an integer.`)
    .min(1, `${name} must greater than 0.`)
    .max(100, `${name} must less than 100.`)
    .required(`${name} is required.`);
};
