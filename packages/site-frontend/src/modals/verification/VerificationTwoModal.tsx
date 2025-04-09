import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { Modal } from "@client/comps/modal/Modal";
import { VerificationTwoForm } from "./VerificationTwoForm";
import { useTranslation } from "@core/services/internationalization/internationalization";
import { ModalHeader } from "@client/comps/modal/ModalHeader";
import { ModalBody } from "@client/comps/modal/ModalBody";
import { Span } from "@client/comps/span/Span";
import { Dialogs } from "@client/services/dialogs";

export const VerificationTwoModal = ({ disableClose }: { disableClose?: boolean }) => {
  const layout = useAppSelector((x) => x.style.bodyLayout);
  const { t } = useTranslation();
  return (
    <Modal
      className="VerificationTwoModal"
      width="md"
      fixedHeight="500px"
      onBackdropClick={() => Dialogs.close("primary")}
    >
      <ModalHeader
        heading={t('accountSetup.title')}
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
          {t('accountSetup.description')}
        </Span>
        <VerificationTwoForm
          layout={layout}
          disableClose={disableClose}
        />
      </ModalBody>
    </Modal>
  );
};
