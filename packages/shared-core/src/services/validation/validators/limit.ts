import { number } from "yup";

export const limit = (name: string = "Limit") => {
  return number()
    .integer({
      key: 'validations.number.integer',
      value: name
    })
    .min(1, {
      key: 'validations.number.moreThan',
      value: {label: name, more: 1}
    })
    .max(100, {
      key: 'validations.number.lessThan',
      value: {label: name, less: 100}
    })
    .required({
      key: 'validations.mixed.required',
      value: name
    });
};
