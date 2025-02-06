import { useState } from "react";
import { Modal } from "@client/comps/modal/Modal";
import { Dialogs } from "@client/services/dialogs";
import { ModalBody } from "@client/comps/modal/ModalBody";
import { ModalHeader } from "@client/comps/modal/ModalHeader";
import { Conditional } from "@client/comps/conditional/Conditional";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { VaultMenu } from "./VaultMenu";
import { VaultAction } from "./VaultAction";
import { DepositForm } from "./DepositForm";
import { WithdrawForm } from "./WithdrawForm";
import { TfaRequiredBody } from "./TfaRequiredBody";

export const VaultModal = () => {
  const [action, setAction] = useState<VaultAction>("deposit");
  const tfaEnabled = useAppSelector((x) => x.user.tfa.enabled);

  return (
    <Modal
      onBackdropClick={() => Dialogs.close("primary")}
      width="sm"
    >
      <ModalHeader
        heading="Vault"
        onCloseClick={() => Dialogs.close("primary")}
      />
      {tfaEnabled ? (
        <ModalBody>
          <VaultMenu
            action={action}
            setAction={setAction}
          />
          <Conditional
            value={action}
            deposit={<DepositForm />}
            withdraw={<WithdrawForm />}
          />
        </ModalBody>
      ) : (
        <TfaRequiredBody />
      )}
    </Modal>
  );
};
