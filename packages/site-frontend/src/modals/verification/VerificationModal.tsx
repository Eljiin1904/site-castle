import { Modal } from "@client/comps/modal/Modal";
import { ModalHeader } from "@client/comps/modal/ModalHeader";
import { Dialogs } from "@client/services/dialogs";
import { ModalBody } from "@client/comps/modal/ModalBody";
import { Span } from "@client/comps/span/Span";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { VerificationOneForm } from "./VerificationOneForm";

export const VerificationModal = ({
  disableClose,
}: {
  disableClose?: boolean;
}) => {
  const layout = useAppSelector((x) => x.style.bodyLayout);

  return (
    <Modal
      className="VerificationModal"
      width="md"
      fixedHeight="500px"
      onBackdropClick={() => Dialogs.close("primary")}
    >
      <ModalHeader
        heading="Quick Account Setup"
        onCloseClick={() => Dialogs.close("primary")}
      />
      <ModalBody
        gap={16}
        overflow={undefined}
      >
        <Span
          pb={16}
          borderBottom
        >
          {
            "A few quick details to secure your account. It only takes a few seconds!"
          }
        </Span>
        <VerificationOneForm
          layout={layout}
          disableClose={disableClose}
        />
      </ModalBody>
    </Modal>
  );
};
