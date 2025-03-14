import { string } from "yup";

export const token = (name: string = "Token") => {
  return string().required({
    key: 'validations.mixed.required',
    value: name
  });
};
