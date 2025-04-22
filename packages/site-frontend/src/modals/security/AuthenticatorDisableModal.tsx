import { Modal } from "@client/comps/modal/Modal";
import { ModalHeader } from "@client/comps/modal/ModalHeader";
import { NoticeCard } from "@client/comps/cards/NoticeCard";
import { Dialogs } from "@client/services/dialogs";
import { Toasts } from "@client/services/toasts";
import { ModalBody } from "@client/comps/modal/ModalBody";
import { Security } from "#app/services/security";
import { AuthenticatorCodeForm } from "./AuthenticatorCodeForm";
import { useTranslation } from "@core/services/internationalization/internationalization";

export const AuthenticatorDisableModal = () => {
  const { t } = useTranslation(["account"]);
  return (
    <Modal
      className="AuthenticatorDisableModal"
      width="md"
      onBackdropClick={() => Dialogs.close("primary")}
    >
      <ModalHeader
        heading={t("account:settings.authenticator.disableModal.header")}
        onCloseClick={() => Dialogs.close("primary")}
      />
      <ModalBody pt={0}>
        <AuthenticatorCodeForm
          onSubmit={async (values) => {
            await Security.authenticatorDisable(values);
            Toasts.success(`account:settings.authenticator.disableModal.success`);
            Dialogs.close("primary");
          }}
          notice={
            <NoticeCard
              kind="warning"
              message={t("account:settings.authenticator.disableModal.description")}
            />
          }
        />
      </ModalBody>
    </Modal>
  );
};
