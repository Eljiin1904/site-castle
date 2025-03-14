import { date } from "yup";

export const dateConditional = (cond: string, name: string) => {
  return date().when(cond, {
    is: true,
    then: (schema) => schema.required({
      key: `validations.mixed.required`,
      value: name
    }),
  });
};
