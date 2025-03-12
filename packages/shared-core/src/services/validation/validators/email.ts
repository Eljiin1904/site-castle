import { string } from "yup";

export const email = (name: string = "Email") => {
  return string()
    .email(`${name} be in a valid format.`)
    .required(`${name} is required.`);
};

export const emailConditional = (name: string = "Email") => {
  return string().when("emailRequired", {
    is: true,
    then: (schema) =>
      schema
        .email(`${name} be in a valid format.`)
        .required(`${name} is required.`),
  });
};
