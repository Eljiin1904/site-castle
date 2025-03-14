import { useNavigate } from "react-router-dom";
import { Validation } from "@core/services/validation";
import { Button } from "@client/comps/button/Button";
import { Form } from "@client/comps/form/Form";
import { useForm } from "@client/comps/form/useForm";
import { Input } from "@client/comps/input/Input";
import { Modal } from "@client/comps/modal/Modal";
import { ModalHeader } from "@client/comps/modal/ModalHeader";
import { ModalLabel } from "@client/comps/modal/ModalLabel";
import { ModalSection } from "@client/comps/modal/ModalSection";
import { Dialogs } from "@client/services/dialogs";
import { Toasts } from "@client/services/toasts";
import { ModalBody } from "@client/comps/modal/ModalBody";
import { useAppDispatch } from "#app/hooks/store/useAppDispatch";
import { Users } from "#app/services/users";
import { useTranslation } from "@core/services/internationalization/internationalization";

export const UserResetPasswordModal = ({
  recoverToken,
}: {
  recoverToken: string;
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {t} = useTranslation(["validations"]);
  const form = useForm({
    schema: Validation.object({
      newPassword: Validation.password(t("validations.password.field")),
      confirmPassword: Validation.confirmPassword()
        .oneOf([Validation.ref("newPassword")],'validations.password.repeated')
        .required(t("validations.password.required",{value:t("validations.password.confirmField")})),
    }),
    onSubmit: async (values) => {
      const { user } = await Users.resetPassword({ ...values, recoverToken });
      dispatch(Users.initUser({ authenticated: true, user }));
      Toasts.success(t("signin.success", { username: user.username }));
      navigate("/");
      Dialogs.close("primary");
    },
  });

  return (
    <Modal
      width="sm"
      onBackdropClick={() => Dialogs.close("primary")}
    >
      <ModalHeader
        heading={t("reset.title")}
        onCloseClick={() => Dialogs.close("primary")}
      />
      <ModalBody>
        <Form form={form}>
          <ModalSection>
            <ModalLabel>{t("reset.form.password")}</ModalLabel>
            <Input
              type="password"
              id="new-password"
              placeholder={t("reset.form.passwordPlaceholder")}
              autoComplete="new-password"
              disabled={form.loading}
              error={form.errors.newPassword?.key ? t(form.errors.newPassword.key, {value: form.errors.newPassword.value}) : undefined}
              value={form.values.newPassword}
              onChange={(x) => form.setValue("newPassword", x)}
            />
          </ModalSection>
          <ModalSection>
            <ModalLabel>{t("reset.form.confirm")}</ModalLabel>
            <Input
              type="password"
              id="confirm-password"
              autoComplete="new-password"
              placeholder={t("reset.form.confirmPlaceholder")}
              disabled={form.loading}
              error={form.errors.confirmPassword?.key ? t(form.errors.confirmPassword.key, {value: form.errors.confirmPassword.value}) : undefined}
              value={form.values.confirmPassword}
              onChange={(x) => form.setValue("confirmPassword", x)}
            />
          </ModalSection>
          <Button
            type="submit"
            kind="primary"
            label={t("reset.form.submit")}
            fx
            loading={form.loading}
          />
        </Form>
      </ModalBody>
    </Modal>
  );
};
