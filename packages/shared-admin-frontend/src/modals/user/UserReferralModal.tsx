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
import { Users } from "#app/services/users";

export const UserReferralModal = ({ user }: { user: UserDocument }) => {
  const userId = user._id;
  const queryClient = useQueryClient();

  const form = useForm({
    schema: Validation.object({
      referralCode: Validation.string(),
    }),
    initialValues: {
      referralCode: user.referral?.name,
    },
    onSubmit: async (values) => {
      await Users.editReferral({ userId, ...values });

      Toasts.success("User referral changed.");
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
        heading="Edit Referral"
        onCloseClick={() => Dialogs.close("primary")}
      />
      <ModalBody>
        <Form form={form}>
          <ModalSection>
            <ModalLabel>{"Current Referral"}</ModalLabel>
            <ModalField>{user.referral?.name || "None"}</ModalField>
          </ModalSection>
          <ModalSection>
            <ModalLabel>{"New Referral"}</ModalLabel>
            <Input
              type="text"
              placeholder="Enter new referral..."
              disabled={form.loading}
              error={form.errors.referralCode}
              value={form.values.referralCode}
              onChange={(x) =>
                form.setValue("referralCode", x?.replace(/[^a-z0-9]/gi, ""))
              }
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
