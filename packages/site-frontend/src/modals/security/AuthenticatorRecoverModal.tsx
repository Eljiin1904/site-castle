import { Validation } from "@core/services/validation";
import { Button } from "@client/comps/button/Button";
import { Form } from "@client/comps/form/Form";
import { useForm } from "@client/comps/form/useForm";
import { Input } from "@client/comps/input/Input";
import { Modal } from "@client/comps/modal/Modal";
import { ModalHeader } from "@client/comps/modal/ModalHeader";
import { ModalLabel } from "@client/comps/modal/ModalLabel";
import { NoticeCard } from "@client/comps/cards/NoticeCard";
import { ModalSection } from "@client/comps/modal/ModalSection";
import { Dialogs } from "@client/services/dialogs";
import { Toasts } from "@client/services/toasts";
import { ModalBody } from "@client/comps/modal/ModalBody";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { Security } from "#app/services/security";
import { useTranslation } from "@core/services/internationalization/internationalization";

export const AuthenticatorRecoverModal = (props: {
  userId?: string | undefined;
}) => {
  const currentUserId = useAppSelector((x) => x.user._id);
  const userId = props.userId || currentUserId;
  const { t } = useTranslation(["validations"]);
  const form = useForm({
    schema: Validation.object({
      backupKey: Validation.string().required("validations.backupKey.required"),
    }),
    onSubmit: async (values) => {
      await Security.authenticatorRecover({ ...values, userId });
      Toasts.success(`account:settings.authenticator.recoveryModal.success`);
      Dialogs.close("primary");
    },
  });

  return (
    <Modal
      className="AuthenticatorRecoverModal"
      width="md"
      onBackdropClick={() => Dialogs.close("primary")}
    >
      <ModalHeader
        heading={t("account:settings.authenticator.recoveryModal.header")}
        onCloseClick={() => Dialogs.close("primary")}
      />
      <ModalBody pt={0}>
        <Form form={form}>
          <ModalSection borderTop borderColor="brown-4" pt={24}>
            <NoticeCard
              kind="info"
              message={t("account:settings.authenticator.recoveryModal.description")}
            />
          </ModalSection>
          <ModalSection>
            <ModalLabel>{t("fields:auth.backupField")}</ModalLabel>
            <Input
              type="text"
              placeholder={t("fields:auth.backupPlaceholder")}
              disabled={form.loading}
              error={
                form.errors.backupKey?.key
                  ? t(form.errors.backupKey.key, { value: form.errors.backupKey.value })
                  : undefined
              }
              value={form.values.backupKey}
              onChange={(x) => form.setValue("backupKey", x)}
            />
          </ModalSection>
          <NoticeCard
            kind="warning"
            message={t("account:settings.authenticator.recoveryModal.notice")}
          />
          <Button
            type="submit"
            kind="primary-yellow"
            label={t("account:settings.authenticator.recoveryModal.action")}
            fx
            loading={form.loading}
          />
        </Form>
      </ModalBody>
    </Modal>
  );
};
