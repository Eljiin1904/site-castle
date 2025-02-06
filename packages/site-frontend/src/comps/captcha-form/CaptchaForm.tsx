import { AnyObject } from "yup";
import classNames from "classnames";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { Div } from "@client/comps/div/Div";
import { Form, FormProps } from "@client/comps/form/Form";
import config from "#app/config";
import { UseCaptchaFormReturn } from "./useCaptchaForm";

export type CaptchaFormProps<T extends AnyObject> = Omit<
  FormProps<T>,
  "form"
> & {
  form: UseCaptchaFormReturn<T>;
};

export function CaptchaForm<T extends AnyObject>({
  className,
  children,
  form,
  ...forwardProps
}: CaptchaFormProps<T>) {
  return (
    <Form
      className={classNames("CaptchaForm", className)}
      form={form}
      {...forwardProps}
    >
      {children}
      {form.challenging && (
        <Div
          className="challenge-box"
          position="absolute"
          top={0}
          fx
          fy
          center
          bg="brown-8"
          border
        >
          <HCaptcha
            sitekey={config.hcaptchaSiteKey}
            onVerify={form.handleVerify}
          />
        </Div>
      )}
    </Form>
  );
}
