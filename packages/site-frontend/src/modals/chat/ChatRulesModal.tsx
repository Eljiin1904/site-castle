import { Modal } from "@client/comps/modal/Modal";
import { ModalBody } from "@client/comps/modal/ModalBody";
import { ModalHeader } from "@client/comps/modal/ModalHeader";
import { Dialogs } from "@client/services/dialogs";
import { UnorderedList } from "@client/comps/list/UnorderedList";

export const ChatRulesModal = () => {
  return (
    <Modal onBackdropClick={() => Dialogs.close("primary")}>
      <ModalHeader
        heading="Chat Rules"
        onCloseClick={() => Dialogs.close("primary")}
      />
      <ModalBody>
        <UnorderedList
          fx
          itemSize={14}
          items={[
            "No begging or advertising.",
            "No scams or sharing personal info.",
            "Respect privacy; no doxing.",
            "No racism or hate speech.",
            "Keep it spam-free.",
          ]}
        />
      </ModalBody>
    </Modal>
  );
};
