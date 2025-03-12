import { string } from "yup";

export const token = (name: string = "Token") => {
  return string().required(`${name} is required.`);
};
