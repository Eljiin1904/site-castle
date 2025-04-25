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
import { ModalDivider } from "@client/comps/modal/ModalDivider";
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
import { Heading } from "@client/comps/heading/Heading";
import { useIsMobileLayout } from "#app/hooks/style/useIsMobileLayout";
import { useTranslation } from "@core/services/internationalization/internationalization";
import { Trans } from "@core/services/internationalization/internationalization";

export const LocalRegisterBody = ({ setAction }: { setAction: (x: LoginAction) => void }) => {
  const [initReferralCode, , removeReferralCode] = useReferralCode();
  const [showReferralCode, setShowReferralCode] = useState(!initReferralCode);
  const dispatch = useAppDispatch();
  const small = useIsMobileLayout();
  const { t } = useTranslation(["validations"]);

  const form = useCaptchaForm({
    schema: Validation.object({
      username: Validation.username(t("validations.username.field")),
      email: Validation.email(t("validations.email.field")),
      password: Validation.password(t("validations.password.field")),
      repeatedPassword: Validation.repeatedPassword(t("validations.password.confirmField")),
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

        Toasts.success("register.success", 5000, { username: user.username });

        Dialogs.close("primary");
      } catch (err) {
        if (
          !showReferralCode &&
          err instanceof Error &&
          err.message.startsWith("errors.invalidReferralCode")
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
      <Heading
        as="h2"
        size={small ? 20 : 24}
        fontWeight="regular"
        textTransform="uppercase"
      >
        {t("register.title")}
      </Heading>
      <CaptchaForm form={form}>
        <ModalSection>
          <ModalLabel>{t("register.form.username")}</ModalLabel>
          <UsernameField
            placeholder={t("register.form.usernamePlaceholder")}
            disabled={form.loading}
            error={form.errors.username?.key ? t(`${form.errors.username.key}`, {value: form.errors.username.value}) : undefined}
            value={form.values.username}
            setError={(x) => form.setError("username", { key: x || "" })}
            onChange={(x) => form.setValue("username", x)}
          />
        </ModalSection>
        <ModalSection>
          <ModalLabel>{t("register.form.email")}</ModalLabel>
          <Input
            type="email"
            id="new-email"
            autoComplete="email"
            placeholder={t("register.form.emailPlaceholder")}
            disabled={form.loading}
            error={form.errors.email?.key ? t(`${form.errors.email.key}`, {value: form.errors.email.value}) : undefined}
            value={form.values.email}
            onChange={(x) => form.setValue("email", x)}
          />
        </ModalSection>
        <ModalSection>
          <ModalLabel>{t("register.form.password")}</ModalLabel>
          <Input
            type="password"
            id="new-password"
            autoComplete="new-password"
            placeholder={t("register.form.passwordPlaceholder")}
            disabled={form.loading}
            error={form.errors.password?.key ? t(`${form.errors.password.key}`, {value: form.errors.password.value}) : undefined}
            value={form.values.password}
            onChange={(x) => form.setValue("password", x)}
          />
        </ModalSection>
        <ModalSection>
          <ModalLabel>{t("register.form.confirm")}</ModalLabel>
          <Input
            type="password"
            id="repeatedPassword"
            placeholder={t("register.form.confirmPlaceholder")}
            disabled={form.loading}
            error={form.errors.repeatedPassword?.key ? t(`${form.errors.repeatedPassword.key}`, {value: form.errors.repeatedPassword.value}) : undefined}
            value={form.values.repeatedPassword}
            onChange={(x) => form.setValue("repeatedPassword", x)}
          />
        </ModalSection>
        {showReferralCode && (
          <ModalSection>
            <ModalLabel>{t("register.form.referral")}</ModalLabel>
            <Input
              type="text"
              placeholder={t("register.form.referralPlaceholder")}
              maxLength={Users.nameMaxLength}
              disabled={form.loading}
              error={form.errors.referralCode?.key ? t(`${form.errors.referralCode.key}`, {value: form.errors.referralCode.value}) : undefined}
              value={form.values.referralCode}
              onChange={(x) => form.setValue("referralCode", x?.replace(/[^a-z0-9]/gi, ""))}
            />
          </ModalSection>
        )}
        <Button
          type="submit"
          kind="primary-yellow"
          label={t("register.form.submit")}
          fx
          mt={8}
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
      >
        {
          //@ts-ignore
          <Trans
          i18nKey="register.disclaimer"
          values={{ link: t("footer.terms") }}
          components={[
            <Link
              type="a"
              href={config.siteURL + "/terms-of-service"}
              fontSize={12}
              fontWeight="regular"
            >
              {t("footer.terms")}
            </Link>,
          ]}
        />
        }
      </Div>
      <ModalDivider label="Or" />
      <SSOButtons />
    </Div>
  );
};
