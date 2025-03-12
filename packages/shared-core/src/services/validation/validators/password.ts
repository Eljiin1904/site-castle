import { ref, string } from "yup";

const minLength = 8;
const maxLength = 64;

export const password = (pword: string = "Password") => {
  return string()
    .min(minLength, `${pword} must be least ${minLength} characters.`)
    .max(maxLength, `${pword} max length is ${maxLength} characters.`)
    .required(`${pword} is required.`);
};

export const repeatedPassword = () => {
  return string().oneOf([ref("password")], "Must match Password");
};
