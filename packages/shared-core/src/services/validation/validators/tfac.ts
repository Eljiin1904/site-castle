import { string } from "yup";

export const tfac = (name: string = "Code") => {
  return string()
    .min(6, `${name} must be 6 digits.`)
    .required(`${name} is required.`);
};
