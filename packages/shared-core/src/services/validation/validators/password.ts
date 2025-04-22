import { ref, string } from "yup";

const minLength = 8;
const maxLength = 64;

export const password = (pword: string = "Password") => {
  return string()
    .min(minLength, {
      key: 'validations.password.min',
      value: {label: pword, min: minLength}
    })
    .max(maxLength, {
      key: 'validations.password.max',
      value: {label: pword, max: maxLength}
    })
    .required({
      key: 'validations.password.required',
      value: pword
    });
};

export const confirmPassword = (pword: string = "Password") => {
  return string().oneOf([ref("newPassword")], {
    key: 'validations.password.repeated',
    value: pword
  }).required({
    key: 'validations.password.required',
    value: pword
  });
};

export const repeatedPassword = (pword: string = "Repeat Password") => {
  return string().oneOf([ref("password")], {
    key: 'validations.password.repeated',
    value: "Password"
  }).required({
    key: 'validations.password.required',
    value: pword
  });
};

export const repeatedNewPassword = (pword: string = "Repeat Password") => {
  return string().oneOf([ref("newPassword")], {
    key: 'validations.password.repeated',
    value: "Password"
  }).required({
    key: 'validations.password.required',
    value: pword
  });
};