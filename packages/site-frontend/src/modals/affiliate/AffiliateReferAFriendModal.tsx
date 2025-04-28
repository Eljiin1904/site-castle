import { Button } from "@client/comps/button/Button";
import { Heading } from "@client/comps/heading/Heading";
import { Img } from "@client/comps/img/Img";
import { Modal } from "@client/comps/modal/Modal";
import { ModalBody } from "@client/comps/modal/ModalBody";
import { ModalHeader } from "@client/comps/modal/ModalHeader";
import { ModalSection } from "@client/comps/modal/ModalSection";
import { Paragraph } from "@client/comps/paragraph/Paragraph";
import { Span } from "@client/comps/span/Span";
import { Dialogs } from "@client/services/dialogs";
import { useState } from "react";
import config from "#app/config";
import { useIsMobileLayout } from "#app/hooks/style/useIsMobileLayout";
import { useTranslation, Trans } from "@core/services/internationalization/internationalization";
import { ModalField } from "@client/comps/modal/ModalField";

export const AffiliateReferAFriendModal = ({campaignId, commissionRate} : {
  campaignId: string,
  commissionRate: number
}) => {
  
  const {t} = useTranslation(["referrals"]);
  const [copied, setCopied] = useState(false);
  const small = useIsMobileLayout();
  

  const referralLink = `${config.siteURL}/r/${campaignId}`;
  const handleCopy = () => {
   
   navigator.clipboard.writeText(referralLink);
   setCopied(true);
  };
  
  return (
    <Modal
      width="sm"
      onBackdropClick={() => Dialogs.close("primary")}
    >
      <ModalHeader
       onCloseClick={() => Dialogs.close("primary")}
       closeColor="dark-brown"
      />
      <Img
        className="slide-img"
        type="jpg"
        path={`/graphics/referral-tile`}
        width="100%"
        skeleton
        objectPositionHorizontal="right"
        height={small ? "270px" : "188px"}
      />
      <ModalBody textAlign="center" mt={small? 40:0} justifyContent={small ? "flex-start": "center"}>
        <ModalSection gap={small ? 24: 16}>
          <Heading as="h3" size={24} fontWeight="regular" textTransform="uppercase">
            {
              //@ts-ignore
              <Trans
              i18nKey="referrals:inviteModal.title"
              values={{ percent: `${commissionRate}%` }}
              components={[
                <Span size={24} family="title" color="sand" >{commissionRate}%</Span>,
              ]}
            />
            }
          </Heading>
          <Paragraph>
          {t('inviteModal.description',{percent: `${commissionRate}%`})}
          </Paragraph>
          </ModalSection>
          <ModalSection gap={16}>
            {copied ? <Span>{t('inviteModal.linkCopied')}</Span>: <ModalField size="lg">{referralLink}</ModalField>}
            <Button kind="tertiary-grey" size="lg" label={t('inviteModal.copyLink')} onClick={handleCopy}></Button>
          </ModalSection>
      </ModalBody>
    </Modal>
  );
};
