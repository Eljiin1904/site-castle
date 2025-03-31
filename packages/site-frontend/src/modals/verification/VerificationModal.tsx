import { Modal } from "@client/comps/modal/Modal";
import { ModalHeader } from "@client/comps/modal/ModalHeader";
import { Dialogs } from "@client/services/dialogs";
import { ModalBody } from "@client/comps/modal/ModalBody";
import { Span } from "@client/comps/span/Span";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { VerificationOneForm } from "./VerificationOneForm";
import { useTranslation } from "@core/services/internationalization/internationalization";

export const VerificationModal = ({
  disableClose,
}: {
  disableClose?: boolean;
}) => {
  const layout = useAppSelector((x) => x.style.bodyLayout);
  const {t} = useTranslation();
  return (
    <Modal
      className="VerificationModal"
      width="md"
      fixedHeight="500px"
      onBackdropClick={() => Dialogs.close("primary")}
    >
      <ModalHeader
        heading={t("accountSetup.title")}
        onCloseClick={() => Dialogs.close("primary")}
      />
      <ModalBody
        gap={16}
        overflow={undefined}
      >
        <Span
          pb={16}
        >
          {t("accountSetup.description")}
        </Span>
        <VerificationOneForm
          layout={layout}
          disableClose={disableClose}
        />
      </ModalBody>
    </Modal>
  );
};
