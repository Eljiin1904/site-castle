import { string } from "yup";
import { Users } from "#core/services/users";

const regex = /^[a-z0-9]+$/i;
const minLength = 2;
const maxLength = Users.nameMaxLength;

export const username = (name: string = "Username") => {
  return string()
    .min(minLength, `${name} must be at least ${minLength} characters.`)
    .max(maxLength, `${name} must be less than ${maxLength} characters.`)
    .matches(regex, `${name} must be in a valid format.`)
    .required(`${name} is required.`);
};
