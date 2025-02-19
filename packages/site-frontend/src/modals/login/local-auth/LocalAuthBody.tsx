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

export const LocalAuthBody = ({
  setAction,
}: {
  setAction: (x: LoginAction) => void;
}) => {
  const dispatch = useAppDispatch();
 const small = useIsMobileLayout();
  const form = useCaptchaForm({
    schema: Validation.object({
      username: Validation.string().required("Email or username is required."),
      password: Validation.string().required("Password is required."),
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
        Toasts.success(`Welcome back, ${res.user.username}!`);
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
          Sign in to SandCasino
      </Heading>
      <CaptchaForm form={form}>
        <ModalSection>
          <ModalLabel>{"Username or email"}</ModalLabel>
          <Input
            type="text"
            id="username"
            autoComplete="username"
            placeholder="Enter username or email..."
            disabled={form.loading}
            error={form.errors.username}
            value={form.values.username}
            onChange={(x) => form.setValue("username", x)}
          />
        </ModalSection>
        <ModalSection>
          <ModalLabel>
            {"Password"}
          </ModalLabel>
          <Input
            type="password"
            id="current-password"
            autoComplete="current-password"
            placeholder="Enter password..."
            disabled={form.loading}
            error={form.errors.password}
            value={form.values.password}
            onChange={(x) => form.setValue("password", x)}
          />
        </ModalSection>
        <ModalSection>
          <Link
            type="action"
            flexGrow
            onClick={() => setAction("recover")}>
            {"Forgot Password?"}
          </Link>
        </ModalSection>
        <ModalSection>
          <Checkbox
              label="Remember me"
              value={form.values.remember}
              onChange={(x) => form.setValue("remember", x)}
            />
        </ModalSection>
        <Button
          type="submit"
          label="Log In"
          kind="secondary"
          labelWeight="medium"
          fx
          mt={4}
          labelSize={16}
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
