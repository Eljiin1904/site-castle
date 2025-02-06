import { Fragment, useState } from "react";
import { Validation } from "@core/services/validation";
import { Button } from "@client/comps/button/Button";
import { Input } from "@client/comps/input/Input";
import { ModalLabel } from "@client/comps/modal/ModalLabel";
import { ModalSection } from "@client/comps/modal/ModalSection";
import { Heading } from "@client/comps/heading/Heading";
import { Span } from "@client/comps/span/Span";
import { Div } from "@client/comps/div/Div";
import { Users } from "#app/services/users";
import { CaptchaForm } from "#app/comps/captcha-form/CaptchaForm";
import { useCaptchaForm } from "#app/comps/captcha-form/useCaptchaForm";
import { LoginAction } from "../LoginAction";

export const RecoverBody = ({
  setAction,
}: {
  setAction: (x: LoginAction) => void;
}) => {
  const [sent, setSent] = useState(false);

  const form = useCaptchaForm({
    schema: Validation.object({
      email: Validation.email(),
    }),
    onSubmit: async (values) => {
      await Users.sendRecoverLink(values);
      setSent(true);
    },
  });

  let content;

  if (!sent) {
    content = (
      <Fragment>
        <Div
          column
          gap={16}
        >
          <Heading as="h2">{"Forgot Password"}</Heading>
          <Span size={13}>
            {
              "Enter the email address associated with your account and we will send you a link to reset your password."
            }
          </Span>
        </Div>
        <ModalSection>
          <ModalLabel>{"Email Address"}</ModalLabel>
          <Input
            type="email"
            id="new-email"
            autoComplete="email"
            placeholder="Enter email..."
            disabled={form.loading || sent}
            error={form.errors.email}
            value={form.values.email}
            onChange={(x) => form.setValue("email", x)}
          />
        </ModalSection>
        <Button
          type="submit"
          kind="primary"
          label="Send Password Reset Link"
          fx
          loading={form.loading}
          mt={4}
        />
      </Fragment>
    );
  } else {
    content = (
      <Fragment>
        <Heading as="h2">{"Email Sent"}</Heading>
        <Div display="block">
          <Span>{"We have sent a password reset link to "}</Span>
          <Span color="white">{form.values.email}</Span>
          <Span>{"."}</Span>
        </Div>
      </Fragment>
    );
  }

  return (
    <Div
      fx
      column
      gap={16}
    >
      <CaptchaForm form={form}>{content}</CaptchaForm>
      <Button
        kind="secondary"
        label="Back to Login"
        fx
        onClick={() => setAction("login")}
      />
    </Div>
  );
};
