import { AnyObject, ObjectSchema, ValidationError } from "yup";

export type TTransErrorKeyValue = {
  key : string;
  value?: string;
};

/**
 * Return Validations errors as key value pair, key used for translation and value for interpolation
 * if message is not a key value pair, it will be converted to key value pair
 * @param schema 
 * @param e 
 * @returns 
 */
export function getErrors<T extends AnyObject>(
  schema: ObjectSchema<T>,
  e: unknown,
) {
  // hacky but (err instanceof) fails in builds
  const err = e as ValidationError;

  const errors: Partial<Record<keyof T, TTransErrorKeyValue>> = {};

  for (const i of err.inner) {
    
    const message = i.message;
    if((message as unknown as TTransErrorKeyValue).key) 
      errors[i.path as keyof T] = i.message as unknown as TTransErrorKeyValue;
    else 
      errors[i.path as keyof T] =  { key: i.message };
  }

  return errors;
}
