import { string } from "yup";

export const tfac = (name: string = "Code") => {
  return string()
    .min(6, {
      key: 'validations.tfac.min',
      value: {label: name, min: 6}
    })
    .required({
      key: 'validations.tfac.required',
      value: name
    });
};
