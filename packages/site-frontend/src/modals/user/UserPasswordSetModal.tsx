import { Validation } from "@core/services/validation";
import { Button } from "@client/comps/button/Button";
import { Input } from "@client/comps/input/Input";
import { Modal } from "@client/comps/modal/Modal";
import { ModalHeader } from "@client/comps/modal/ModalHeader";
import { ModalLabel } from "@client/comps/modal/ModalLabel";
import { ModalSection } from "@client/comps/modal/ModalSection";
import { Dialogs } from "@client/services/dialogs";
import { Toasts } from "@client/services/toasts";
import { ModalBody } from "@client/comps/modal/ModalBody";
import { CaptchaForm } from "#app/comps/captcha-form/CaptchaForm";
import { useCaptchaForm } from "#app/comps/captcha-form/useCaptchaForm";
import { Users } from "#app/services/users";
import { useTranslation } from "@core/services/internationalization/internationalization";

export const UserPasswordSetModal = () => {
  const { t } = useTranslation(["validations"]);
  const form = useCaptchaForm({
    schema: Validation.object({
      newPassword: Validation.password(t("fields:password.newField")),
      repeatedPassword: Validation.repeatedNewPassword(t("validations.password.confirmField")),
    }),
    onSubmit: async (values) => {
      await Users.editPassword(values);
      Toasts.success(`account:settings.email.successSet`);
      Dialogs.close("primary");
    },
  });

  return (
    <Modal
      width="md"
      onBackdropClick={() => Dialogs.close("primary")}
    >
      <ModalHeader
        heading={t("account:settings.password.headerSet")}
        onCloseClick={() => Dialogs.close("primary")}
      />
      <ModalBody pt={0}>
        <CaptchaForm form={form}>
          <ModalSection borderTop borderColor="brown-4" pt={24}>
            <ModalLabel>{t("fields:password.newField")}</ModalLabel>
            <Input
              type="password"
              id="new-password"
              placeholder={t("fields:password.newFieldPlaceholder")}
              autoComplete="new-password"
              disabled={form.loading}
              error={
                form.errors.newPassword?.key
                  ? t(form.errors.newPassword.key, { value: form.errors.newPassword.value })
                  : undefined
              }
              value={form.values.newPassword}
              onChange={(x) => form.setValue("newPassword", x)}
            />
          </ModalSection>
          <ModalSection>
            <ModalLabel>{t("fields:password.repeatNewField")}</ModalLabel>
            <Input
              type="password"
              id="repeatedPassword"
              placeholder={t("fields:password.repeatNewFieldPlaceholder")}
              autoComplete="new-password"
              disabled={form.loading}
              error={form.errors.repeatedPassword?.key ? t(`${form.errors.repeatedPassword.key}`, {value: form.errors.repeatedPassword.value}) : undefined}
              value={form.values.repeatedPassword}
              onChange={(x) => form.setValue("repeatedPassword", x)}
            />
          </ModalSection>
          <Button
            type="submit"
            kind="primary-yellow"
            label={t("account:settings.password.headerSet")}
            fx
            loading={form.loading}
          />
        </CaptchaForm>
      </ModalBody>
    </Modal>
  );
};
