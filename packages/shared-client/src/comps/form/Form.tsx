import { AnyObject } from "yup";
import classNames from "classnames";
import { Box, BoxProps } from "../box/Box";
import { UseFormReturn } from "./useForm";
import { FormErrorBox } from "./FormErrorBox";
import "./Form.scss";

export type FormProps<T extends AnyObject> = Omit<BoxProps<"form">, "as"> & {
  form: UseFormReturn<T>;
};

export function Form<T extends AnyObject>({
  className,
  children,
  form,
  ...forwardProps
}: FormProps<T>) {
  return (
    <Box
      as="form"
      className={classNames("Form", className, {
        error: form.submitError,
      })}
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      {...forwardProps}
    >
      {children}
      {form.submitError && (
        <FormErrorBox
          error={form.submitError}
          onAck={() => form.setSubmitError(undefined)}
        />
      )}
    </Box>
  );
}
