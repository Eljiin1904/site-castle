import { useIsMobileLayout } from "#app/hooks/style/useIsMobileLayout";
import { Div } from "@client/comps/div/Div";
import { Heading } from "@client/comps/heading/Heading";
import { Modal } from "@client/comps/modal/Modal";
import { ModalBody } from "@client/comps/modal/ModalBody";
import { ModalHeader } from "@client/comps/modal/ModalHeader";
import { ModalSection } from "@client/comps/modal/ModalSection";
import { Paragraph } from "@client/comps/paragraph/Paragraph";
import { Dialogs } from "@client/services/dialogs";

export const AffiliateHowItWorksModal = () => {
  
  const small = useIsMobileLayout();
  return (
    <Modal
      width={small ? "sm" : "md"}
      onBackdropClick={() => Dialogs.close("primary")}
    >
      <ModalHeader
        heading="How do Referrals Work?"
        onCloseClick={() => Dialogs.close("primary")}
        headerContent={ <Paragraph mt={small ? 16: 24}>
          {"Refer a friend to Sandcasino and earn free money from all of their bets!"}
        </Paragraph>}
      />
      <ModalBody pt={0}>
        <Div fx column gap={small ? 20: 32} pt={small ? 24: 32}  borderTop borderColor="brown-4">
          <ModalSection>
          <Heading as="h3" size={small ? 20: 16} fontWeight="regular" textTransform="uppercase">
            {"Step 1"}
          </Heading>
          <Paragraph mt={12}>
            {"Have a friend that would love Sandcasino? Help them sign up using your Referral Link, or your Code, and they will be counted as your referral!"}
          </Paragraph>
          </ModalSection>
          <ModalSection>
          <Heading as="h3"size={small ? 20: 16} fontWeight="regular" textTransform="uppercase">
            {"Step 2"}
          </Heading>
          <Paragraph mt={12}>
            {"You will earn 10% commission from the house edge on all bets placed by your referrals whether they win or lose."}
          </Paragraph>
         </ModalSection>
         <ModalSection>
          <Heading as="h3" size={small ? 20: 16} fontWeight="regular"  textTransform="uppercase">
            {"Step 3"}
          </Heading>
          <Paragraph mt={12}>
            {"Your referral earnings are immediately available to be claimed!"}
          </Paragraph>
         </ModalSection>
         </Div>        
      </ModalBody>
    </Modal>
  );
};
