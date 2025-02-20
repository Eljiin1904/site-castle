import { Fragment, useState } from "react";
import { Validation } from "@core/services/validation";
import { Button } from "@client/comps/button/Button";
import { Input } from "@client/comps/input/Input";
import { ModalSection } from "@client/comps/modal/ModalSection";
import { Heading } from "@client/comps/heading/Heading";
import { Span } from "@client/comps/span/Span";
import { Div } from "@client/comps/div/Div";
import { Users } from "#app/services/users";
import { CaptchaForm } from "#app/comps/captcha-form/CaptchaForm";
import { useCaptchaForm } from "#app/comps/captcha-form/useCaptchaForm";
import { LoginAction } from "../LoginAction";
import { Vector } from "@client/comps/vector/Vector";
import { SvgLock } from "#app/svgs/common/SvgLock";
import { useIsMobileLayout } from "#app/hooks/style/useIsMobileLayout";
import { Link } from "@client/comps/link/Link";
import { SvgPlane } from "#app/svgs/common/SvgPlane";

export const RecoverBody = ({
  setAction,
}: {
  setAction: (x: LoginAction) => void;
}) => {
  const [sent, setSent] = useState(false);
  const small = useIsMobileLayout();
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
          flexCenter
        >
          <Div width={40} px={48} py={28} borderRadius={"full"} border borderColor="brown-4" borderWidth={1}>
            <Vector fx as={SvgLock} size={40} color="dark-sand" />
          </Div>          
          <Heading  as="h2"
            size={small ? 20 : 24}
            fontWeight="regular"
            textTransform="uppercase">Forgot Password?
          </Heading>
          <Span size={14} color="dark-sand" textAlign="center">
          Please enter the email associated with your account.
          </Span>
        </Div>
        <ModalSection>
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
          kind="secondary"
          label="Recover Password"
          labelWeight="medium"
          labelSize={16}
          fx
          loading={form.loading}
          mt={4}
        />
      </Fragment>
    );
  } else {
    content = (
      <Fragment>
        <Div
          column
          gap={32}
          flexCenter
        >
          <Div width={40} px={48} py={28} borderRadius={"full"} border borderColor="brown-4" borderWidth={1}>
            <Vector fx as={SvgPlane} size={40} color="dark-sand" />
          </Div>
          <Heading  as="h2"
            size={small ? 20 : 24}
            fontWeight="regular"
            textTransform="uppercase">
              Password Recovery Sent
          </Heading>
          <Span size={14} color="dark-sand" textAlign="center">
            If you don't receive a password recovery link, please check your spam folder.
          </Span>
          <Div
            className="disclaimer-box"
            display="block"
            left={0}
            right={0}
            bottom={0}
            textAlign="center"
            fontSize={12}
            color="dark-sand"
          >
             <Link
              type="action"
              fontSize={14}
              fontWeight="semi-bold"
              onClick={() => form.handleSubmit()}
            >
              {"Didn’t Receive? Resend Password"}
            </Link>
          </Div>
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
    </Div>
  );
};
