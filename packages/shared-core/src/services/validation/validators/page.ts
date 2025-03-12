import { number } from "yup";

export const page = (name: string = "Page") => {
  return number()
    .integer(`${name} must be an integer.`)
    .min(1, `${name} must greater than 0.`)
    .required(`${name} is required.`);
};
