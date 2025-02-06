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

export const AuthenticatorRecoverModal = (props: {
  userId?: string | undefined;
}) => {
  const currentUserId = useAppSelector((x) => x.user._id);
  const userId = props.userId || currentUserId;

  const form = useForm({
    schema: Validation.object({
      backupKey: Validation.string().required("Backup key is required."),
    }),
    onSubmit: async (values) => {
      await Security.authenticatorRecover({ ...values, userId });
      Toasts.success("Authenticator removed.");
      Dialogs.close("primary");
    },
  });

  return (
    <Modal
      className="AuthenticatorRecoverModal"
      width="sm"
      onBackdropClick={() => Dialogs.close("primary")}
    >
      <ModalHeader
        heading="Authenticator Recovery"
        onCloseClick={() => Dialogs.close("primary")}
      />
      <ModalBody>
        <Form form={form}>
          <NoticeCard
            kind="info"
            message={`Your backup key is in a file named "chicken_backup_key.txt"`}
          />
          <ModalSection>
            <ModalLabel>{"Backup Key"}</ModalLabel>
            <Input
              type="text"
              placeholder="Enter backup key..."
              disabled={form.loading}
              error={form.errors.backupKey}
              value={form.values.backupKey}
              onChange={(x) => form.setValue("backupKey", x)}
            />
          </ModalSection>
          <NoticeCard
            kind="warning"
            message="This will remove the authenticator from your account."
          />
          <Button
            type="submit"
            kind="primary"
            label="Remove Authenticator"
            fx
            loading={form.loading}
          />
        </Form>
      </ModalBody>
    </Modal>
  );
};
