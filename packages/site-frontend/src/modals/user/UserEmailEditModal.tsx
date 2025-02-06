import { Validation } from "@core/services/validation";
import { Button } from "@client/comps/button/Button";
import { Input } from "@client/comps/input/Input";
import { Modal } from "@client/comps/modal/Modal";
import { ModalHeader } from "@client/comps/modal/ModalHeader";
import { ModalLabel } from "@client/comps/modal/ModalLabel";
import { ModalSection } from "@client/comps/modal/ModalSection";
import { Dialogs } from "@client/services/dialogs";
import { Toasts } from "@client/services/toasts";
import { ModalField } from "@client/comps/modal/ModalField";
import { ModalBody } from "@client/comps/modal/ModalBody";
import { CaptchaForm } from "#app/comps/captcha-form/CaptchaForm";
import { useCaptchaForm } from "#app/comps/captcha-form/useCaptchaForm";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { Users } from "#app/services/users";
import { UserEmailConfirmModal } from "./UserEmailConfirmModal";

export const UserEmailEditModal = () => {
  const currentEmail = useAppSelector((x) => x.user.email);

  const form = useCaptchaForm({
    schema: Validation.object({
      email: Validation.email().notOneOf(
        [currentEmail],
        "Cannot be current email.",
      ),
      password: Validation.password(),
    }),
    onSubmit: async (values) => {
      await Users.editEmail(values);
      Toasts.success("Email changed.");
      Dialogs.open("primary", <UserEmailConfirmModal />);
    },
  });

  return (
    <Modal
      width="sm"
      onBackdropClick={() => Dialogs.close("primary")}
    >
      <ModalHeader
        heading="Change Email"
        onCloseClick={() => Dialogs.close("primary")}
      />
      <ModalBody>
        <CaptchaForm form={form}>
          <ModalSection>
            <ModalLabel>{"Current Email"}</ModalLabel>
            <ModalField>{currentEmail}</ModalField>
          </ModalSection>
          <ModalSection>
            <ModalLabel>{"New Email"}</ModalLabel>
            <Input
              type="email"
              id="new-email"
              autoComplete="email"
              placeholder="Enter new email..."
              disabled={form.loading}
              error={form.errors.email}
              value={form.values.email}
              onChange={(x) => form.setValue("email", x)}
            />
          </ModalSection>
          <ModalSection>
            <ModalLabel>{"Current Password"}</ModalLabel>
            <Input
              type="password"
              id="current-password"
              autoComplete="current-password"
              placeholder="Enter current password..."
              disabled={form.loading}
              error={form.errors.password}
              value={form.values.password}
              onChange={(x) => form.setValue("password", x)}
            />
          </ModalSection>
          <Button
            type="submit"
            kind="primary"
            label="Submit"
            fx
            loading={form.loading}
          />
        </CaptchaForm>
      </ModalBody>
    </Modal>
  );
};
