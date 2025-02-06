import { Validation } from "@core/services/validation";
import { Button } from "@client/comps/button/Button";
import { Input } from "@client/comps/input/Input";
import { Modal } from "@client/comps/modal/Modal";
import { Div } from "@client/comps/div/Div";
import { ModalHeader } from "@client/comps/modal/ModalHeader";
import { ModalLabel } from "@client/comps/modal/ModalLabel";
import { ModalSection } from "@client/comps/modal/ModalSection";
import { Dialogs } from "@client/services/dialogs";
import { Toasts } from "@client/services/toasts";
import { ModalBody } from "@client/comps/modal/ModalBody";
import { Form } from "@client/comps/form/Form";
import { useForm } from "@client/comps/form/useForm";
import { useMount } from "@client/hooks/system/useMount";
import { NoticeCard } from "@client/comps/cards/NoticeCard";
import { Users } from "#app/services/users";
import { UserEmailEditModal } from "./UserEmailEditModal";

export const UserEmailConfirmModal = ({
  confirmToken: initToken,
}: {
  confirmToken?: string;
}) => {
  useMount(async () => {
    await Users.sendEmailLink();
  });

  const form = useForm({
    schema: Validation.object({
      confirmToken: Validation.string().required("Code is required."),
    }),
    initialValues: {
      confirmToken: initToken,
    },
    onSubmit: async (values) => {
      await Users.confirmEmail(values);
      Toasts.success("Email confirmed.");
      Dialogs.close("primary");
    },
  });

  return (
    <Modal
      width="sm"
      onBackdropClick={() => Dialogs.close("primary")}
    >
      <ModalHeader
        heading="Confirm Email"
        onCloseClick={() => Dialogs.close("primary")}
      />
      <ModalBody>
        <Form form={form}>
          <NoticeCard
            kind="success"
            message="We sent a code to your email, please enter it below."
          />
          <ModalSection>
            <ModalLabel>{"Code"}</ModalLabel>
            <Input
              type="text"
              placeholder="Enter code..."
              disabled={form.loading}
              error={form.errors.confirmToken}
              value={form.values.confirmToken}
              onChange={(x) =>
                form.setValue(
                  "confirmToken",
                  x?.replace(/[^a-z0-9]/gi, "").toUpperCase(),
                )
              }
            />
          </ModalSection>
          <Div
            fx
            column
            gap={12}
          >
            <Button
              kind="secondary"
              label="Change Email"
              fx
              loading={form.loading}
              onClick={() => Dialogs.open("primary", <UserEmailEditModal />)}
            />
            <Button
              type="submit"
              kind="primary"
              label="Submit"
              fx
              loading={form.loading}
            />
          </Div>
        </Form>
      </ModalBody>
    </Modal>
  );
};
