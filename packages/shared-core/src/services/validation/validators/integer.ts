import { number } from "yup";

export const integer = (name: string) => {
  return number()
  .integer({
      key: 'validations.number.integer',
      value: {label: name}
    })
    .required({
      key: 'validations.mixed.required',
      value: name
    });
};
