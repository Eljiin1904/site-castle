import { Modal } from "@client/comps/modal/Modal";
import { ModalHeader } from "@client/comps/modal/ModalHeader";
import { Dialogs } from "@client/services/dialogs";
import { ModalBody } from "@client/comps/modal/ModalBody";
import { Security } from "#app/services/security";
import { AuthenticatorCodeForm } from "./AuthenticatorCodeForm";

export async function waitForBet2fa() {
  return await new Promise<string | undefined>((resolve) => {
    Dialogs.open(
      "primary",
      <AuthenticatorBetModal
        onVerify={(betToken) => resolve(betToken)}
        onCancel={() => resolve(undefined)}
      />,
    );
  });
}

export const AuthenticatorBetModal = ({
  onVerify,
  onCancel,
}: {
  onVerify: (betToken: string) => void;
  onCancel: () => void;
}) => {
  const handleCancel = () => {
    Dialogs.close("primary");
    onCancel();
  };

  return (
    <Modal
      className="AuthenticatorBetModal"
      width="sm"
      onBackdropClick={handleCancel}
    >
      <ModalHeader
        heading="Bet 2FA"
        onCloseClick={handleCancel}
      />
      <ModalBody>
        <AuthenticatorCodeForm
          onSubmit={async (values) => {
            const { betToken } = await Security.getBetToken(values);
            onVerify(betToken);
            Dialogs.close("primary");
          }}
        />
      </ModalBody>
    </Modal>
  );
};
