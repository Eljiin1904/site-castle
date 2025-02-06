import { useNavigate } from "react-router-dom";
import { Validation } from "@core/services/validation";
import { Button } from "@client/comps/button/Button";
import { Form } from "@client/comps/form/Form";
import { useForm } from "@client/comps/form/useForm";
import { Input } from "@client/comps/input/Input";
import { Modal } from "@client/comps/modal/Modal";
import { ModalHeader } from "@client/comps/modal/ModalHeader";
import { ModalLabel } from "@client/comps/modal/ModalLabel";
import { ModalSection } from "@client/comps/modal/ModalSection";
import { Dialogs } from "@client/services/dialogs";
import { Toasts } from "@client/services/toasts";
import { ModalBody } from "@client/comps/modal/ModalBody";
import { useAppDispatch } from "#app/hooks/store/useAppDispatch";
import { Users } from "#app/services/users";

export const UserResetPasswordModal = ({
  recoverToken,
}: {
  recoverToken: string;
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const form = useForm({
    schema: Validation.object({
      newPassword: Validation.password("New password"),
      confirmPassword: Validation.string()
        .oneOf([Validation.ref("newPassword")], "Does not match new password.")
        .required("Confirmation is required."),
    }),
    onSubmit: async (values) => {
      const { user } = await Users.resetPassword({ ...values, recoverToken });
      dispatch(Users.initUser({ authenticated: true, user }));
      Toasts.success(`Welcome back, ${user.username}!`);
      navigate("/");
      Dialogs.close("primary");
    },
  });

  return (
    <Modal
      width="sm"
      onBackdropClick={() => Dialogs.close("primary")}
    >
      <ModalHeader
        heading="Reset Password"
        onCloseClick={() => Dialogs.close("primary")}
      />
      <ModalBody>
        <Form form={form}>
          <ModalSection>
            <ModalLabel>{"New Password"}</ModalLabel>
            <Input
              type="password"
              id="new-password"
              placeholder="Enter new password..."
              autoComplete="new-password"
              disabled={form.loading}
              error={form.errors.newPassword}
              value={form.values.newPassword}
              onChange={(x) => form.setValue("newPassword", x)}
            />
          </ModalSection>
          <ModalSection>
            <ModalLabel>{"Confirm New Password"}</ModalLabel>
            <Input
              type="password"
              id="confirm-password"
              autoComplete="new-password"
              placeholder="Confirm password..."
              disabled={form.loading}
              error={form.errors.confirmPassword}
              value={form.values.confirmPassword}
              onChange={(x) => form.setValue("confirmPassword", x)}
            />
          </ModalSection>
          <Button
            type="submit"
            kind="primary"
            label="Set New Password"
            fx
            loading={form.loading}
          />
        </Form>
      </ModalBody>
    </Modal>
  );
};
