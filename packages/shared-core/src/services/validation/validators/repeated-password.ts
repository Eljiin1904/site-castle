import { object, ref, string } from "yup";

export const repeatedPassword = () => {
  return object({
    password: string()
      .min(8, {
        key: 'validations.password.min',
        value: {label: 'Password', min: 8}
      })
      .required({
        key: 'validations.password.required',
        value: 'Password'
      }),
      repeatedPassword: string()
      .oneOf([ref("password")], {
        key: 'validations.password.repeated',
        value: "Password"
      })
      .required({key: 'validation.password.confirm'})
  });
};