import { AnyObject, ObjectSchema, ValidationError } from "yup";

export function getErrors<T extends AnyObject>(
  schema: ObjectSchema<T>,
  e: unknown,
) {
  // hacky but (err instanceof) fails in builds
  const err = e as ValidationError;

  const errors: Partial<Record<keyof T, string>> = {};

  for (const i of err.inner) {
    errors[i.path as keyof T] = i.message;
  }

  return errors;
}
