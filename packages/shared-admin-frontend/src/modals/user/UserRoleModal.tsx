import { useQueryClient } from "@tanstack/react-query";
import { Validation } from "@core/services/validation";
import { Strings } from "@core/services/strings";
import { UserDocument } from "@core/types/users/UserDocument";
import { Button } from "@client/comps/button/Button";
import { Dropdown } from "@client/comps/dropdown/Dropdown";
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
import { Users } from "#app/services/users";

export const UserRoleModal = ({ user }: { user: UserDocument }) => {
  const userId = user._id;
  const queryClient = useQueryClient();

  const form = useForm({
    schema: Validation.object({
      roleIndex: Validation.number().required(),
    }),
    initialValues: {
      roleIndex: 0,
    },
    onSubmit: async ({ roleIndex }) => {
      await Users.editRole({ userId, newRole: Users.roles[roleIndex] });

      Toasts.success("User role changed.");
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
        heading="Edit Role"
        onCloseClick={() => Dialogs.close("primary")}
      />
      <ModalBody overflow={undefined}>
        <Form form={form}>
          <ModalSection>
            <ModalLabel>{"Current Role"}</ModalLabel>
            <ModalField>{Strings.capitalize(user.role)}</ModalField>
          </ModalSection>
          <ModalSection>
            <ModalLabel>{"New Role"}</ModalLabel>
            <Dropdown
              type="select"
              fx
              options={Users.roles.map(Strings.capitalize)}
              disabled={form.loading}
              value={form.values.roleIndex || 0}
              onChange={(x, i) => form.setValue("roleIndex", i)}
            />
          </ModalSection>
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
