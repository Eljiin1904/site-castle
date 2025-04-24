import { useState } from "react";
import { AnyObject } from "yup";
import { useIsMounted } from "usehooks-ts";
import {
  UseFormProps,
  UseFormReturn,
  useForm,
} from "@client/comps/form/useForm";

export type UseCaptchaFormProps<T extends AnyObject> = Omit<
  UseFormProps<T>,
  "onSubmit"
> & {
  onSubmit: (values: T & { captchaToken: string }) => void | Promise<void>;
};

export type UseCaptchaFormReturn<T extends AnyObject> = UseFormReturn<T> & {
  challenging: boolean;
  handleVerify: (captchaToken: string) => void;
};

let callback: (x: string) => void;

export function useCaptchaForm<T extends AnyObject>({
  onSubmit,
  ...forwardProps
}: UseCaptchaFormProps<T>): UseCaptchaFormReturn<T> {
  const [challenging, setChallenging] = useState(false);
  const isMounted = useIsMounted();

  const form = useForm({
    ...forwardProps,
    onSubmit: async (values) => {
      let captchaToken = "";

      try {
        setChallenging(false);
        // captchaToken = await new Promise<string>((resolve) => {
        //   callback = resolve;
        // });
      } finally {
        if (isMounted()) {
          setChallenging(false);
        }
      }

      await onSubmit({ ...values, captchaToken });
    },
  });

  const handleVerify = (x: string) => callback(x);

  return {
    ...form,
    challenging,
    handleVerify,
  };
}
