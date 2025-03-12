import { object, ref, string } from "yup";

export const repeatedPassword = () => {
  return object({
    password: string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    repeatedPassword: string()
      .oneOf([ref("password")], "Passwords must match")
      .required("Please confirm your password"),
  });
};
