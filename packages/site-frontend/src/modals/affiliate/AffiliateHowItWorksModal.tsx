import { useIsMobileLayout } from "#app/hooks/style/useIsMobileLayout";
import { Div } from "@client/comps/div/Div";
import { Heading } from "@client/comps/heading/Heading";
import { Modal } from "@client/comps/modal/Modal";
import { ModalBody } from "@client/comps/modal/ModalBody";
import { ModalHeader } from "@client/comps/modal/ModalHeader";
import { ModalSection } from "@client/comps/modal/ModalSection";
import { Paragraph } from "@client/comps/paragraph/Paragraph";
import { Dialogs } from "@client/services/dialogs";
import { useTranslation } from "@core/services/internationalization/internationalization";

export const AffiliateHowItWorksModal = () => {
  
  const {t} = useTranslation(["referrals"]);
  const small = useIsMobileLayout();
  return (
    <Modal
      width={small ? "sm" : "md"}
      onBackdropClick={() => Dialogs.close("primary")}

    >
      <ModalHeader
        heading={t("howItWorks.modal.title")}
        onCloseClick={() => Dialogs.close("primary")}
        headerContent={ <Paragraph mt={small ? 16: 24}>
         {t("howItWorks.modal.description")}
        </Paragraph>}
        noBorder
      />
      <ModalBody>
        <Div fx column gap={small ? 20: 32}>
          <ModalSection>
          <Heading as="h3" size={small ? 20: 16} fontWeight="regular" textTransform="uppercase">
          {t("howItWorks.modal.list.item1.title")}
          </Heading>
          <Paragraph mt={12}>
          {t("howItWorks.modal.list.item1.description")}
          </Paragraph>
          </ModalSection>
          <ModalSection>
          <Heading as="h3"size={small ? 20: 16} fontWeight="regular" textTransform="uppercase">
          {t("howItWorks.modal.list.item2.title")}
          </Heading>
          <Paragraph mt={12}>
          {t("howItWorks.modal.list.item2.description")}
          </Paragraph>
         </ModalSection>
         <ModalSection>
          <Heading as="h3" size={small ? 20: 16} fontWeight="regular"  textTransform="uppercase">
          {t("howItWorks.modal.list.item3.title")}
          </Heading>
          <Paragraph mt={12}>
          {t("howItWorks.modal.list.item3.description")}
          </Paragraph>
         </ModalSection>
         </Div>        
      </ModalBody>
    </Modal>
  );
};
