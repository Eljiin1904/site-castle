import { number } from "yup";

export const index = (name: string, max: number) => {
  return number()
    .integer({
      key: 'validations.number.integer',
      value: {label: name}
    })
    .min(0, {
      key: 'validations.index.min',
      value: {label: name, min: 0}
    })
    .max(max, {
      key: 'validations.index.max',
      value: {label: name, max}
    })
    .required({
      key: 'validations.mixed.required',
      value: name
    });
};
