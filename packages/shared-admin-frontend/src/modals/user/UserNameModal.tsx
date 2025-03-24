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
import { useTranslation } from "@core/services/internationalization/internationalization";

export const UserNameModal = ({ user }: { user: UserDocument }) => {
  const userId = user._id;
  const queryClient = useQueryClient();
  const { t } = useTranslation(["validations"]);

  const form = useForm({
    schema: Validation.object({
      newName: Validation.username(),
    }),
    onSubmit: async (values) => {
      await Users.editName({ userId, ...values });

      Toasts.success("User's name changed.");
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
        heading="Edit Username"
        onCloseClick={() => Dialogs.close("primary")}
      />
      <ModalBody>
        <Form form={form}>
          <ModalSection>
            <ModalLabel>{"Current Username"}</ModalLabel>
            <ModalField>{user.username}</ModalField>
          </ModalSection>
          <ModalSection>
            <ModalLabel>{"New Username"}</ModalLabel>
            <Input
              type="text"
              id="new-username"
              autoComplete="username"
              placeholder="Enter new username..."
              disabled={form.loading}
              error={
                form.errors.newName?.key
                  ? t(form.errors.newName.key, { value: form.errors.newName.value })
                  : undefined
              }
              value={form.values.newName}
              onChange={(x) => form.setValue("newName", x?.replace(/[^a-z0-9]/gi, ""))}
            />
          </ModalSection>
          <NoticeCard
            kind="warning"
            message="You should only change a user's name if you have no other option."
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
