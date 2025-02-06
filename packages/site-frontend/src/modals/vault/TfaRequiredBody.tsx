import { Button } from "@client/comps/button/Button";
import { NoticeCard } from "@client/comps/cards/NoticeCard";
import { ModalBody } from "@client/comps/modal/ModalBody";
import { Dialogs } from "@client/services/dialogs";
import { AuthenticatorEnableModal } from "../security/AuthenticatorEnableModal";

export const TfaRequiredBody = () => {
  return (
    <ModalBody>
      <NoticeCard
        kind="warning"
        message="You must enable an authenticator to use the vault."
      />
      <Button
        fx
        kind="primary"
        label="Enable Authenticator"
        onClick={() => Dialogs.open("primary", <AuthenticatorEnableModal />)}
      />
    </ModalBody>
  );
};
