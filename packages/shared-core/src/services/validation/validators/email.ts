import { string } from "yup";

export const email = (name: string = "Email") => {
  return string()
    .email(() => {
      return {
        key: "validations.email.invalid",
        value: name
      };
    })
    .required(() => {
      return {
        key: "validations.email.required",
        value: name
      };
    });
};

export const emailConditional = (name: string = "Email") => {
  return string().when("emailRequired", {
    is: true,
    then: (schema) =>
      schema
        .email({
          key: "validations.email.invalid",
          value: name
        })
        .required({
          key: "validations.email.required",
          value: name
        }),
  });
};
