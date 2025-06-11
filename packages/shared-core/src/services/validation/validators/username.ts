import { string } from "yup";
import { Users } from "#core/services/users";

const regexUsername = /^[a-z0-9]+$/i;
const regexEmail = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
const regexUsernameOrEmail = new RegExp(`^(${regexUsername.source}|${regexEmail.source})$`);
const minLength = 2;
const maxLength = Users.nameMaxLength;

export const username = (name: string = "Username") => {
  return string()
    .required({
      key: 'validations.username.required',
      value: name
    }).
    min(minLength, {
      key: 'validations.username.min',
      value: {label: name, min: minLength}
    }).
    max(maxLength, {
      key: 'validations.username.max',
      value: {label: name, max: maxLength}
    })
    .matches(regexUsernameOrEmail, {
      key: 'validations.username.matches',
      value: name
    });
};