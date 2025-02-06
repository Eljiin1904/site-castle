import { Modal } from "@client/comps/modal/Modal";
import { ModalHeader } from "@client/comps/modal/ModalHeader";

export const DepositPulseModal = ({ onClose }: { onClose: () => void }) => {
  return (
    <Modal
      onBackdropClick={onClose}
      fixedHeight="800px"
    >
      <ModalHeader
        heading="Deposit with Pulse"
        onCloseClick={onClose}
      />
      <iframe
        allow="accelerometer; autoplay; camera; encrypted-media; gyroscope; payment; clipboard-read; clipboard-write https://pulsegiftcards.com/;"
        src="https://pulsegiftcards.com/flow/38097?source=chicken.gg"
        width="100%"
        height="100%"
        style={{ border: "none" }}
      />
    </Modal>
  );
};
