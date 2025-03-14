import { Validation } from "@core/services/validation";
import { Button } from "@client/comps/button/Button";
import { Input } from "@client/comps/input/Input";
import { ModalLabel } from "@client/comps/modal/ModalLabel";
import { ModalSection } from "@client/comps/modal/ModalSection";
import { Dialogs } from "@client/services/dialogs";
import { Toasts } from "@client/services/toasts";
import { Link } from "@client/comps/link/Link";
import { Div } from "@client/comps/div/Div";
import { ModalDivider } from "@client/comps/modal/ModalDivider";
import { CaptchaForm } from "#app/comps/captcha-form/CaptchaForm";
import { useCaptchaForm } from "#app/comps/captcha-form/useCaptchaForm";
import { useAppDispatch } from "#app/hooks/store/useAppDispatch";
import { Security } from "#app/services/security";
import { Users } from "#app/services/users";
import { AuthenticatorLoginModal } from "../../security/AuthenticatorLoginModal";
import { SSOButtons } from "../SSOButtons";
import { LoginAction } from "../LoginAction";
import { Heading } from "@client/comps/heading/Heading";
import { useIsMobileLayout } from "#app/hooks/style/useIsMobileLayout";
import { Checkbox } from "@client/comps/checkbox/Checkbox";
import { ToggleSlide } from "#app/pages/account/settings/ToggleSlide";
import { useTranslation } from "@core/services/internationalization/internationalization";

export const LocalAuthBody = ({
  setAction,
}: {
  setAction: (x: LoginAction) => void;
}) => {
  const dispatch = useAppDispatch();
  const small = useIsMobileLayout();
  const {t} = useTranslation(["validations"]);

  const form = useCaptchaForm({
    schema: Validation.object({
      username: Validation.username(t("validations.username.field")),
      password: Validation.password(t("validations.password.field")),
      remember: Validation.boolean(),
    }),
    onSubmit: async (values) => {
      const res = await Security.authLocal(values);
      if (res.action === "2fa") {
        Dialogs.open(
          "primary",
          <AuthenticatorLoginModal
            userId={res.userId}
            loginToken={res.loginToken}
          />,
        );
      } else if (res.action === "login") {
        dispatch(Users.initUser({ authenticated: true, user: res.user }));
        Toasts.success(t("signin.success",{username: res.user.username}));
        Dialogs.close("primary");
      }
    },
  });
  
  return (
    <Div
      fx
      column
      gap={16}
    >
      <Heading
              as="h2"
              size={small ? 20 : 24}
              fontWeight="regular"
              textTransform="uppercase"
        >
          {t("signin.title")}
      </Heading>
      <CaptchaForm form={form}>
        <ModalSection>
          <ModalLabel>{t("signin.form.username")}</ModalLabel>
          <Input
            type="text"
            id="username"
            autoComplete="username"
            placeholder={t("signin.form.usernamePlaceholder")}
            disabled={form.loading}
            error={form.errors.username?.key ? t(form.errors.username.key, {value: form.errors.username.value}) : undefined}
            value={form.values.username}
            onChange={(x) => form.setValue("username", x)}
          />
        </ModalSection>
        <ModalSection>
          <ModalLabel>
          {t("signin.form.password")}
          </ModalLabel>
          <Input
            type="password"
            id="current-password"
            autoComplete="current-password"
            placeholder={t("signin.form.passwordPlaceholder")}
            disabled={form.loading}
            error={form.errors.password?.key ? t(form.errors.password.key, {value: form.errors.password.value}) : undefined}
            value={form.values.password}
            onChange={(x) => form.setValue("password", x)}
          />
        </ModalSection>
        <ModalSection>
          <Link
            type="action"
            flexGrow
            onClick={() => setAction("recover")}>
           {t("signin.forgot")}
          </Link>
        </ModalSection>
        <ModalSection>
          <Checkbox
              label={t("signin.remember")}
              value={form.values.remember}
              onChange={(x) => form.setValue("remember", x)}
            />
        </ModalSection>
        <Button
          type="submit"
          label={t("signin.login")}
          kind="primary-yellow"
          fx
          mt={4}
          loading={form.loading}
        />
      </CaptchaForm>
      <ModalDivider
        label="Or"
        my={8}
      />
      <SSOButtons />
    </Div>
  );
};
