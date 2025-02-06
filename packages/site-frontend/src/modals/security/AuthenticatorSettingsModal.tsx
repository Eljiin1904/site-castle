import { Validation } from "@core/services/validation";
import { Button } from "@client/comps/button/Button";
import { Form } from "@client/comps/form/Form";
import { useForm } from "@client/comps/form/useForm";
import { Modal } from "@client/comps/modal/Modal";
import { Paragraph } from "@client/comps/paragraph/Paragraph";
import { ModalHeader } from "@client/comps/modal/ModalHeader";
import { ModalLabel } from "@client/comps/modal/ModalLabel";
import { ModalSection } from "@client/comps/modal/ModalSection";
import { Checkbox } from "@client/comps/checkbox/Checkbox";
import { Dialogs } from "@client/services/dialogs";
import { Toasts } from "@client/services/toasts";
import { ModalBody } from "@client/comps/modal/ModalBody";
import { Input } from "@client/comps/input/Input";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { Security } from "#app/services/security";

export const AuthenticatorSettingsModal = () => {
  const settings = useAppSelector((x) => x.user.settings);

  const form = useForm({
    schema: Validation.object({
      login2fa: Validation.boolean().required(),
      withdraw2fa: Validation.boolean().required(),
      bet2fa: Validation.boolean().required(),
      tfac: Validation.tfac(),
    }),
    initialValues: {
      login2fa: settings.login2fa,
      withdraw2fa: settings.withdraw2fa,
      bet2fa: settings.bet2fa,
    },
    onSubmit: async (values) => {
      await Security.updateSettings(values);
      Toasts.success("Authenticator settings updated.");
      Dialogs.close("primary");
    },
  });

  return (
    <Modal
      className="AuthenticatorSettingsModal"
      width="sm"
      onBackdropClick={() => Dialogs.close("primary")}
    >
      <ModalHeader
        heading="Authenticator Settings"
        onCloseClick={() => Dialogs.close("primary")}
      />
      <ModalBody>
        <Form form={form}>
          <ModalSection>
            <Paragraph>
              {
                "Please review your 2FA settings. These settings can be adjusted any time on the account page."
              }
            </Paragraph>
          </ModalSection>
          <ModalSection>
            <ModalLabel>{"Login"}</ModalLabel>
            <Checkbox
              label="Require 2FA to login"
              value={form.values.login2fa}
              onChange={(x) => form.setValue("login2fa", x)}
            />
          </ModalSection>
          <ModalSection>
            <ModalLabel>{"Withdraw"}</ModalLabel>
            <Checkbox
              label="Require 2FA to withdraw"
              value={form.values.withdraw2fa}
              onChange={(x) => form.setValue("withdraw2fa", x)}
            />
          </ModalSection>
          <ModalSection>
            <ModalLabel>{"Bet"}</ModalLabel>
            <Checkbox
              label="Require 2FA on first bet"
              value={form.values.bet2fa}
              onChange={(x) => form.setValue("bet2fa", x)}
            />
          </ModalSection>
          <ModalSection>
            <ModalLabel>{"Authenticator Code"}</ModalLabel>
            <Input
              type="text"
              placeholder="Enter 6-digit code..."
              maxLength={6}
              disabled={form.loading}
              error={form.errors.tfac}
              value={form.values.tfac}
              onChange={(x) =>
                form.setValue("tfac", x?.replace(/[^0-9]/gi, ""))
              }
            />
          </ModalSection>
          <Button
            type="submit"
            kind="primary"
            label="Update Settings"
            fx
            loading={form.loading}
          />
        </Form>
      </ModalBody>
    </Modal>
  );
};
