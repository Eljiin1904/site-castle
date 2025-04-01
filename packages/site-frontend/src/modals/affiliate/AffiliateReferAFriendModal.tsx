import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { ImageBanner } from "#app/pages/affiliate/ImageBanner";
import { Affiliates } from "#app/services/affiliates";
import { Button } from "@client/comps/button/Button";
import { Conditional } from "@client/comps/conditional/Conditional";
import { Div } from "@client/comps/div/Div";
import { Heading } from "@client/comps/heading/Heading";
import { Img } from "@client/comps/img/Img";
import { KeyboardInput } from "@client/comps/input/KeyboardInput";
import { Modal } from "@client/comps/modal/Modal";
import { ModalBody } from "@client/comps/modal/ModalBody";
import { ModalHeader } from "@client/comps/modal/ModalHeader";
import { ModalSection } from "@client/comps/modal/ModalSection";
import { Paragraph } from "@client/comps/paragraph/Paragraph";
import { Span } from "@client/comps/span/Span";
import { Table } from "@client/comps/table/Table";
import { Dialogs } from "@client/services/dialogs";
import { Intimal } from "@core/services/intimal";
import { Numbers } from "@core/services/numbers";
import { useState } from "react";
import config from "#app/config";
import { TextInput } from "@client/comps/input/TextInput";
import { useIsMobileLayout } from "#app/hooks/style/useIsMobileLayout";

export const AffiliateReferAFriendModal = () => {
  
  const small = useIsMobileLayout();
  const username = useAppSelector((x) => x.user.username);
  const [copied, setCopied] = useState(false);

  const referralLink = `${config.siteURL}/r/${username}`;
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
        // style={{ minHeight: small ? "208px" : "280px"}}
        skeleton
        objectPositionHorizontal="right"
        height="188px"
      />
      <ModalBody textAlign="center" justifyContent="center">
        <ModalSection gap={small ? 24: 16}>
          <Heading as="h3" size={24} fontWeight="regular" textTransform="uppercase">
            {"Refer a Friend and Earn"} <Span size={24} family="title" color="sand">10%</Span>
          </Heading>
          <Paragraph>
            {"Refer a friend and earn 10% commission from the house edge on all of their bets!"}
          </Paragraph>
          </ModalSection>
          <ModalSection gap={16}>
            {copied ? <Span>Copied!</Span>: <TextInput onChange={() => {}} size="lg" type="text" placeholder="Copy to Keyboard" value={referralLink} />}
            <Button kind="tertiary-grey" size="lg" label="Copy to Keyboard" onClick={handleCopy}></Button>
          </ModalSection>
      </ModalBody>
    </Modal>
  );
};
