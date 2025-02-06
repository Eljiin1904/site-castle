import { useState } from "react";
import config from "#app/config";
import { Validation } from "@core/services/validation";
import { Button } from "@client/comps/button/Button";
import { Input } from "@client/comps/input/Input";
import { Link } from "@client/comps/link/Link";
import { ModalLabel } from "@client/comps/modal/ModalLabel";
import { ModalSection } from "@client/comps/modal/ModalSection";
import { Dialogs } from "@client/services/dialogs";
import { Toasts } from "@client/services/toasts";
import { Div } from "@client/comps/div/Div";
import { Vector } from "@client/comps/vector/Vector";
import { ModalDivider } from "@client/comps/modal/ModalDivider";
import { SVGRegister } from "@client/svgs/common/SvgRegister";
import { CaptchaForm } from "#app/comps/captcha-form/CaptchaForm";
import { useCaptchaForm } from "#app/comps/captcha-form/useCaptchaForm";
import { useAppDispatch } from "#app/hooks/store/useAppDispatch";
import { useReferralCode } from "#app/hooks/users/useReferralCode";
import { Security } from "#app/services/security";
import { Users } from "#app/services/users";
import { Gtm } from "#app/services/gtm";
import { UsernameField } from "#app/comps/username-field/UsernameField";
import { SSOButtons } from "../SSOButtons";
import { LoginAction } from "../LoginAction";
import "./LocalRegisterBody.scss";

export const LocalRegisterBody = ({ setAction }: { setAction: (x: LoginAction) => void }) => {
  const [initReferralCode, , removeReferralCode] = useReferralCode();
  const [showReferralCode, setShowReferralCode] = useState(!initReferralCode);
  const dispatch = useAppDispatch();

  const form = useCaptchaForm({
    schema: Validation.object({
      username: Validation.username(),
      email: Validation.email(),
      password: Validation.password(),
      repeatedPassword: Validation.repeatedPassword(),
      referralCode: Validation.string(),
    }),
    initialValues: {
      referralCode: initReferralCode,
    },
    onSubmit: async (values) => {
      try {
        const { user } = await Security.registerLocal({ ...values });

        dispatch(Users.initUser({ authenticated: true, user }));

        Gtm.trackRegister({ user, strategy: "local" });

        Toasts.success(`Welcome, ${user.username}!`);

        Dialogs.close("primary");
      } catch (err) {
        if (
          !showReferralCode &&
          err instanceof Error &&
          err.message.startsWith("Invalid referral code.")
        ) {
          removeReferralCode();
          setShowReferralCode(true);
        }
        throw err;
      }
    },
  });

  return (
    <Div
      fx
      column
      gap={16}
      className="register-body"
    >
      <Div
        align="flex-start"
        className="register-header"
      >
        <Vector as={SVGRegister} />
      </Div>
      <CaptchaForm form={form}>
        <ModalSection>
          <ModalLabel>{"Username"}</ModalLabel>
          <UsernameField
            placeholder="Enter Username"
            disabled={form.loading}
            error={form.errors.username}
            value={form.values.username}
            setError={(x) => form.setError("username", x)}
            onChange={(x) => form.setValue("username", x)}
          />
        </ModalSection>
        <ModalSection>
          <ModalLabel>{"Email"}</ModalLabel>
          <Input
            type="email"
            id="new-email"
            autoComplete="email"
            placeholder="Enter Email"
            disabled={form.loading}
            error={form.errors.email}
            value={form.values.email}
            onChange={(x) => form.setValue("email", x)}
          />
        </ModalSection>
        <ModalSection>
          <ModalLabel>{"Password"}</ModalLabel>
          <Input
            type="password"
            id="new-password"
            autoComplete="new-password"
            placeholder="Enter Password"
            disabled={form.loading}
            error={form.errors.password}
            value={form.values.password}
            onChange={(x) => form.setValue("password", x)}
          />
        </ModalSection>
        <ModalSection>
          <ModalLabel>{"Repeat Password"}</ModalLabel>
          <Input
            type="password"
            id="repeatedPassword"
            placeholder="Reenter Password"
            disabled={form.loading}
            error={form.errors.repeatedPassword}
            value={form.values.repeatedPassword}
            onChange={(x) => form.setValue("repeatedPassword", x)}
          />
        </ModalSection>
        {showReferralCode && (
          <ModalSection>
            <ModalLabel>{"Code (Optional)"}</ModalLabel>
            <Input
              type="text"
              placeholder="Enter Code"
              maxLength={Users.nameMaxLength}
              disabled={form.loading}
              error={form.errors.referralCode}
              value={form.values.referralCode}
              onChange={(x) => form.setValue("referralCode", x?.replace(/[^a-z0-9]/gi, ""))}
            />
          </ModalSection>
        )}
        <Button
          type="submit"
          kind="secondary"
          label="Register"
          fx
          mt={4}
          loading={form.loading}
        />
      </CaptchaForm>
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
        {"By registering, you agree to our "}
        <Link
          type="a"
          href={config.siteURL + "/terms-of-service"}
          fontSize={12}
          fontWeight="regular"
        >
          {"terms & conditions"}
        </Link>
        {" and that you're 18+ years old."}
      </Div>
      <ModalDivider label="Or" />
      <SSOButtons />
    </Div>
  );
};
