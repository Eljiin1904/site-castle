import { Modal } from "@client/comps/modal/Modal";
import { ModalHeader } from "@client/comps/modal/ModalHeader";
import { Dialogs } from "@client/services/dialogs";
import { ModalBody } from "@client/comps/modal/ModalBody";
import { AuthenticatorCodeForm } from "./AuthenticatorCodeForm";

export async function waitForAuthenticatorCode() {
  return await new Promise<string | undefined>((resolve) => {
    Dialogs.open(
      "secondary",
      <AuthenticatorCodeModal
        onSubmit={(tfac) => resolve(tfac)}
        onCancel={() => resolve(undefined)}
      />,
    );
  });
}

export const AuthenticatorCodeModal = ({
  onSubmit,
  onCancel,
}: {
  onSubmit: (tfac: string) => void;
  onCancel: () => void;
}) => {
  const handleCancel = () => {
    Dialogs.close("secondary");
    onCancel();
  };

  return (
    <Modal
      className="AuthenticatorBetModal"
      width="sm"
      onBackdropClick={handleCancel}
    >
      <ModalHeader
        heading="Authenticator 2FA"
        onCloseClick={handleCancel}
      />
      <ModalBody>
        <AuthenticatorCodeForm
          onSubmit={({ tfac }) => {
            onSubmit(tfac);
            Dialogs.close("secondary");
          }}
        />
      </ModalBody>
    </Modal>
  );
};
