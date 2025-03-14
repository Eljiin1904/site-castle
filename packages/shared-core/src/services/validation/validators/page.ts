import { number } from "yup";

export const page = (name: string = "Page") => {
  return number()
    .integer({
      key: 'validations.number.integer',
      value: name
    })
    .min(1, {
      key: 'validations.page.min',
      value: {label: name, min: 1}
    })
    .required({
      key: 'validations.page.required',
      value: name
    });
};
