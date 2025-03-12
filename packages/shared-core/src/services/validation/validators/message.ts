import { string } from "yup";

const minLength = 1;
const maxLength = 200;

export const message = (name: string = "Message") => {
  return string()
    .min(minLength, `${name} must be at least ${minLength} characters.`)
    .max(maxLength, `${name} must be less than ${maxLength} characters.`)
    .required(`${name} is required.`);
};
