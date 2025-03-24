import { useState } from "react";
import { useIsMounted } from "usehooks-ts";
import { AnyObject, ObjectSchema } from "yup";
import { Validation } from "@core/services/validation";
import { Toasts } from "#client/services/toasts";
import { Errors } from "#client/services/errors";
import { useTranslation } from "@core/services/internationalization/internationalization";

type SetValueFunc<T extends AnyObject> = <K extends keyof T>(
  key: K,
  value: T[K] | undefined,
) => void;
type SetErrorFunc<T extends AnyObject> = <K extends keyof T>(
  key: K,
  error: string | undefined,
) => void;

export type UseFormProps<T extends AnyObject> = {
  schema: ObjectSchema<T>;
  initialValues?: Partial<T>;
  toastSubmitError?: boolean;
  onSubmit: (values: T) => void | Promise<void>;
};

export type UseFormReturn<T extends AnyObject> = {
  values: Partial<T>;
  loading: boolean;
  errors: Partial<Record<keyof T, string>>;
  submitError: string | undefined;
  setValue: SetValueFunc<T>;
  setError: SetErrorFunc<T>;
  setSubmitError: (x: string | undefined) => void;
  handleSubmit: () => void;
};

export function useForm<T extends AnyObject>({
  schema,
  initialValues,
  toastSubmitError,
  onSubmit,
}: UseFormProps<T>): UseFormReturn<T> {
  const [values, setValues] = useState<Partial<T>>(initialValues || {});
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [submitError, setSubmitError] = useState<string>();
  const [loading, setLoading] = useState(false);
  const isMounted = useIsMounted();
  const {t} = useTranslation(['validations']);
  const setValue: SetValueFunc<T> = (key, value) => {
    setValues((values) => ({ ...values, [key]: value }));
  };

  const setError: SetErrorFunc<T> = (key, value) => {
    setErrors((errors) => ({ ...errors, [key]: value }));
  };

  const handleSubmit = async () => {
    try {
      await schema.validate(values, { abortEarly: false });
      setErrors({});
    } catch (e) {
      setErrors(Validation.getErrors(schema, e));
      return;
    }

    try {
      setLoading(true);
      await onSubmit(values as T);
    } catch (err) {
      if (toastSubmitError) {
        Toasts.error(err);
      } else if (isMounted()) {
        
        const errorCause = (err as Error)?.cause;
        const errorKey  = (err as Error).message;
        setSubmitError(t(errorKey, {value: errorCause}));
      }
    } finally {
      if (isMounted()) {
        setLoading(false);
      }
    }
  };

  return {
    values,
    loading,
    errors,
    submitError,
    setValue,
    setError,
    setSubmitError,
    handleSubmit,
  };
}
