import { Validation } from "@core/services/validation";
import { Button } from "@client/comps/button/Button";
import { Input } from "@client/comps/input/Input";
import { Modal } from "@client/comps/modal/Modal";
import { ModalHeader } from "@client/comps/modal/ModalHeader";
import { ModalLabel } from "@client/comps/modal/ModalLabel";
import { ModalSection } from "@client/comps/modal/ModalSection";
import { Dialogs } from "@client/services/dialogs";
import { Toasts } from "@client/services/toasts";
import { ModalField } from "@client/comps/modal/ModalField";
import { ModalBody } from "@client/comps/modal/ModalBody";
import { CaptchaForm } from "#app/comps/captcha-form/CaptchaForm";
import { useCaptchaForm } from "#app/comps/captcha-form/useCaptchaForm";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { Users } from "#app/services/users";
import { UserEmailConfirmModal } from "./UserEmailConfirmModal";
import { useTranslation } from "@core/services/internationalization/internationalization";

export const UserEmailEditModal = () => {
  const currentEmail = useAppSelector((x) => x.user.email);
  const { t } = useTranslation(["validations"]);
  const form = useCaptchaForm({
    schema: Validation.object({
      email: Validation.email().notOneOf(
        [currentEmail],
        "validations.email.notEqual",
      ),
      password: Validation.password(),
    }),
    onSubmit: async (values) => {
      await Users.editEmail(values);
      Toasts.success(`account:settings.email.success`);
      Dialogs.open("primary", <UserEmailConfirmModal />);
    },
  });

  return (
    <Modal
      width="md"
      onBackdropClick={() => Dialogs.close("primary")}
    >
      <ModalHeader
        heading={t("account:settings.email.description")}
        onCloseClick={() => Dialogs.close("primary")}
      />
      <ModalBody>
        <CaptchaForm form={form}>
          <ModalSection>
            <ModalLabel>{t("fields:currentEmail.field")}</ModalLabel>
            <ModalField>{currentEmail}</ModalField>
          </ModalSection>
          <ModalSection>
            <ModalLabel>{t("fields:newEmail.field")}</ModalLabel>
            <Input
              type="email"
              id="new-email"
              autoComplete="email"
              placeholder={t("fields:newEmail.placeholder")}
              disabled={form.loading}
              error={
                form.errors.email?.key
                  ? t(form.errors.email.key, { value: form.errors.email.value })
                  : undefined
              }
              value={form.values.email}
              onChange={(x) => form.setValue("email", x)}
            />
          </ModalSection>
          <ModalSection>
            <ModalLabel>{t("fields:password.currentPassword")}</ModalLabel>
            <Input
              type="password"
              id="current-password"
              autoComplete="current-password"
              placeholder={t("fields:password.currentPasswordPlaceholder")}
              disabled={form.loading}
              error={
                form.errors.password?.key
                  ? t(form.errors.password.key, { value: form.errors.password.value })
                  : undefined
              }
              value={form.values.password}
              onChange={(x) => form.setValue("password", x)}
            />
          </ModalSection>
          <Button
            type="submit"
            kind="primary-yellow"
            label={t("common:save")}
            fx
            loading={form.loading}
          />
        </CaptchaForm>
      </ModalBody>
    </Modal>
  );
};
