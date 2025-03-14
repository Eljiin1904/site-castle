import { string } from "yup";

const minLength = 1;
const maxLength = 200;

export const message = (name: string = "Message") => {
  return string()
    .min(minLength, {
      key: 'validations.string.min',
      value: {label: name, min: minLength}
    })
    .max(maxLength, {
      key: 'validations.string.max',
      value: {label: name, max: maxLength}
    })
    .required({
      key: 'validations.mixed.required',
      value: name
    });
};
