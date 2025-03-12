import { useQueryClient } from "@tanstack/react-query";
import { Validation } from "@core/services/validation";
import { UserDocument } from "@core/types/users/UserDocument";
import { Button } from "@client/comps/button/Button";
import { Input } from "@client/comps/input/Input";
import { Modal } from "@client/comps/modal/Modal";
import { ModalHeader } from "@client/comps/modal/ModalHeader";
import { ModalLabel } from "@client/comps/modal/ModalLabel";
import { ModalSection } from "@client/comps/modal/ModalSection";
import { Dialogs } from "@client/services/dialogs";
import { Toasts } from "@client/services/toasts";
import { ModalBody } from "@client/comps/modal/ModalBody";
import { Form } from "@client/comps/form/Form";
import { useForm } from "@client/comps/form/useForm";
import { ModalField } from "@client/comps/modal/ModalField";
import { NoticeCard } from "@client/comps/cards/NoticeCard";
import { Users } from "#app/services/users";

export const UserEmailModal = ({ user }: { user: UserDocument }) => {
  const userId = user._id;
  const queryClient = useQueryClient();

  const form = useForm({
    schema: Validation.object({
      newEmail: Validation.email(),
    }),
    onSubmit: async (values) => {
      await Users.editEmail({ userId, ...values });

      Toasts.success("User email changed.");
      Dialogs.close("primary");

      queryClient.invalidateQueries({ queryKey: ["user", user._id] });
    },
  });

  return (
    <Modal
      width="sm"
      onBackdropClick={() => Dialogs.close("primary")}
    >
      <ModalHeader
        heading="Edit Email"
        onCloseClick={() => Dialogs.close("primary")}
      />
      <ModalBody>
        <Form form={form}>
          <ModalSection>
            <ModalLabel>{"Current Email"}</ModalLabel>
            <ModalField>{user.email}</ModalField>
          </ModalSection>
          <ModalSection>
            <ModalLabel>{"New Email"}</ModalLabel>
            <Input
              type="email"
              id="new-email"
              autoComplete="email"
              placeholder="Enter new email..."
              disabled={form.loading}
              error={form.errors.newEmail}
              value={form.values.newEmail}
              onChange={(x) => form.setValue("newEmail", x)}
            />
          </ModalSection>
          <NoticeCard
            kind="warning"
            message="The user will have to re-confirm their email."
          />
          <Button
            type="submit"
            kind="primary"
            label="Submit"
            fx
            loading={form.loading}
          />
        </Form>
      </ModalBody>
    </Modal>
  );
};
