import { Modal } from "@client/comps/modal/Modal";
import { ModalHeader } from "@client/comps/modal/ModalHeader";
import { NoticeCard } from "@client/comps/cards/NoticeCard";
import { Dialogs } from "@client/services/dialogs";
import { Toasts } from "@client/services/toasts";
import { ModalBody } from "@client/comps/modal/ModalBody";
import { Security } from "#app/services/security";
import { AuthenticatorCodeForm } from "./AuthenticatorCodeForm";

export const AuthenticatorDisableModal = () => {
  return (
    <Modal
      className="AuthenticatorDisableModal"
      width="sm"
      onBackdropClick={() => Dialogs.close("primary")}
    >
      <ModalHeader
        heading="Disable Authenticator"
        onCloseClick={() => Dialogs.close("primary")}
      />
      <ModalBody>
        <AuthenticatorCodeForm
          onSubmit={async (values) => {
            await Security.authenticatorDisable(values);
            Toasts.success("Authenticator disabled.");
            Dialogs.close("primary");
          }}
          notice={
            <NoticeCard
              kind="warning"
              message="This will remove the authenticator from your account."
            />
          }
        />
      </ModalBody>
    </Modal>
  );
};
