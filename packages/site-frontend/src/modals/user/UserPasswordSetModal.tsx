import { Validation } from "@core/services/validation";
import { Button } from "@client/comps/button/Button";
import { Input } from "@client/comps/input/Input";
import { Modal } from "@client/comps/modal/Modal";
import { ModalHeader } from "@client/comps/modal/ModalHeader";
import { ModalLabel } from "@client/comps/modal/ModalLabel";
import { ModalSection } from "@client/comps/modal/ModalSection";
import { Dialogs } from "@client/services/dialogs";
import { Toasts } from "@client/services/toasts";
import { ModalBody } from "@client/comps/modal/ModalBody";
import { CaptchaForm } from "#app/comps/captcha-form/CaptchaForm";
import { useCaptchaForm } from "#app/comps/captcha-form/useCaptchaForm";
import { Users } from "#app/services/users";

export const UserPasswordSetModal = () => {
  const form = useCaptchaForm({
    schema: Validation.object({
      newPassword: Validation.password("New password"),
    }),
    onSubmit: async (values) => {
      await Users.editPassword(values);
      Toasts.success("Password set.");
      Dialogs.close("primary");
    },
  });

  return (
    <Modal
      width="sm"
      onBackdropClick={() => Dialogs.close("primary")}
    >
      <ModalHeader
        heading="Set Password"
        onCloseClick={() => Dialogs.close("primary")}
      />
      <ModalBody>
        <CaptchaForm form={form}>
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
          <Button
            type="submit"
            kind="primary"
            label="Set Password"
            fx
            loading={form.loading}
          />
        </CaptchaForm>
      </ModalBody>
    </Modal>
  );
};
