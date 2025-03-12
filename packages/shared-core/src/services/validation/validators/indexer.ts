import { number } from "yup";

export const index = (name: string, max: number) => {
  return number()
    .integer(`${name} must be an integer.`)
    .min(0, `${name} must be >= 0.`)
    .max(max, `${name} must be < ${max}.`)
    .required(`${name} is required.`);
};
