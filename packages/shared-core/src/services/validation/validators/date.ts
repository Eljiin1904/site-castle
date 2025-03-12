import { date } from "yup";

export const dateConditional = (cond: string, name: string) => {
  return date().when(cond, {
    is: true,
    then: (schema) => schema.required(`${name} is required.`),
  });
};
