import { Modal } from "@client/comps/modal/Modal";
import { ModalHeader } from "@client/comps/modal/ModalHeader";
import { Dialogs } from "@client/services/dialogs";
import { ModalBody } from "@client/comps/modal/ModalBody";
import { VerificationThreeContents } from "./VerificationThreeContents";

export const VerificationThreeModal = ({
  disableClose,
}: {
  disableClose?: boolean;
}) => {
  return (
    <Modal
      className="VerificationThreeModal"
      width="sm"
      onBackdropClick={() => Dialogs.close("primary")}
    >
      <ModalHeader
        heading="Sumsub Setup"
        onCloseClick={() => Dialogs.close("primary")}
      />
      <ModalBody gap={16}>
        <VerificationThreeContents disableClose={disableClose} />
      </ModalBody>
    </Modal>
  );
};
