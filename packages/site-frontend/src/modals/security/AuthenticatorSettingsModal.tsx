import { Validation } from "@core/services/validation";
import { Button } from "@client/comps/button/Button";
import { Form } from "@client/comps/form/Form";
import { useForm } from "@client/comps/form/useForm";
import { Modal } from "@client/comps/modal/Modal";
import { Paragraph } from "@client/comps/paragraph/Paragraph";
import { ModalHeader } from "@client/comps/modal/ModalHeader";
import { ModalLabel } from "@client/comps/modal/ModalLabel";
import { ModalSection } from "@client/comps/modal/ModalSection";
import { Checkbox } from "@client/comps/checkbox/Checkbox";
import { Dialogs } from "@client/services/dialogs";
import { Toasts } from "@client/services/toasts";
import { ModalBody } from "@client/comps/modal/ModalBody";
import { Input } from "@client/comps/input/Input";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { Security } from "#app/services/security";
import { useTranslation } from "@core/services/internationalization/internationalization";

export const AuthenticatorSettingsModal = () => {
  const settings = useAppSelector((x) => x.user.settings);
  const {t} = useTranslation(["validations"]);
  const form = useForm({
    schema: Validation.object({
      login2fa: Validation.boolean().required(),
      withdraw2fa: Validation.boolean().required(),
      bet2fa: Validation.boolean().required(),
      tfac: Validation.tfac(),
    }),
    initialValues: {
      login2fa: settings.login2fa,
      withdraw2fa: settings.withdraw2fa,
      bet2fa: settings.bet2fa,
    },
    onSubmit: async (values) => {
      await Security.updateSettings(values);
      Toasts.success(`account:settings.authenticator.settingsModal.success`);
      Dialogs.close("primary");
    },
  });

  return (
    <Modal
      className="AuthenticatorSettingsModal"
      width="sm"
      onBackdropClick={() => Dialogs.close("primary")}
    >
      <ModalHeader
        heading={t('account:settings.authenticator.settingsModal.header')}
        onCloseClick={() => Dialogs.close("primary")}
      />
      <ModalBody>
        <Form form={form}>
          <ModalSection>
            <Paragraph>
            {t('account:settings.authenticator.settingsModal.description')}
            </Paragraph>
          </ModalSection>
          <ModalSection>
            <ModalLabel>{t("menu.login")}</ModalLabel>
            <Checkbox
              label={t("account:preferences.login2fa.description")}
              value={form.values.login2fa}
              onChange={(x) => form.setValue("login2fa", x)}
            />
          </ModalSection>
          <ModalSection>
            <ModalLabel>{t("menu.account.withdraw")}</ModalLabel>
            <Checkbox
              label={t("account:preferences.withdraw2fa.description")}
              value={form.values.withdraw2fa}
              onChange={(x) => form.setValue("withdraw2fa", x)}
            />
          </ModalSection>
          <ModalSection>
            <ModalLabel>{t("menu.bet",{count: 1})}</ModalLabel>
            <Checkbox
              label={t("account:preferences.bet2fa.description")}
              value={form.values.bet2fa}
              onChange={(x) => form.setValue("bet2fa", x)}
            />
          </ModalSection>
          <ModalSection>
            <ModalLabel>{t("fields:auth.field")}</ModalLabel>
            <Input
              type="text"
              placeholder={t("fields:auth.placeholder")}
              maxLength={6}
              disabled={form.loading}
              error={
                form.errors.tfac?.key
                  ? t(form.errors.tfac.key, { value: form.errors.tfac.value })
                  : undefined
              }
              value={form.values.tfac}
              onChange={(x) =>
                form.setValue("tfac", x?.replace(/[^0-9]/gi, ""))
              }
            />
          </ModalSection>
          <Button
            type="submit"
            kind="primary-yellow"
            label={t("account:settings.authenticator.settingsModal.action")}
            fx
            loading={form.loading}
          />
        </Form>
      </ModalBody>
    </Modal>
  );
};
