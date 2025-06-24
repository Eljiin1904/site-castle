import { useState } from "react";
import { Button } from "@client/comps/button/Button";
import { Div } from "@client/comps/div/Div";
import { Modal } from "@client/comps/modal/Modal";
import { ModalBody } from "@client/comps/modal/ModalBody";
import { ModalHeader } from "@client/comps/modal/ModalHeader";
import { Span } from "@client/comps/span/Span";
import { Dialogs } from "@client/services/dialogs";
import { Link } from "@client/comps/link/Link";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import config from "#app/config";
import { LoginModal } from "../login/LoginModal";
import { useTranslation } from "@core/services/internationalization/internationalization";
import { ModalSection } from "@client/comps/modal/ModalSection";
import { ModalCopyField } from "@client/comps/modal/ModalCopyField";

export const ChatEarnModal = () => {
  const [copied, setCopied] = useState(false);
  const authenticated = useAppSelector((x) => x.user.authenticated);
  const campaigns = useAppSelector((state) => state.affiliates.campaigns);
  const campaign = campaigns.find((x) => x.default);
  const {t} = useTranslation(['chat']);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(`${config.siteURL}/r/${campaign?.campaignId}`);
    setCopied(true);
  };

  if (!authenticated) {
    return <LoginModal />;
  }
  return (
    <Modal onBackdropClick={() => Dialogs.close("primary")}>
      <ModalHeader
        heading={t("earnModal.heading")}
        onCloseClick={() => Dialogs.close("primary")}
        noBorder
      />
      <ModalBody pt={0}>
        <Div display="block">
          <Span>{t("earnModal.description")}</Span>
          <Link
            type="router"
            to="/affiliate"
            ml={4}
            onClick={() => Dialogs.close("primary")}
          >
            {t("common:more")}
          </Link>
        </Div>
        <ModalSection gap={16}>
          <ModalCopyField size="lg" color="light-sand" text={`${config.siteURL}/r/${campaign?.campaignId}`} />
          <Button kind={!copied? `primary-yellow`: `tertiary-grey`} size="lg" label={copied ? t('common:copied'): t('common:copyClipboard')} onClick={handleCopy}></Button>
        </ModalSection>
      </ModalBody>
    </Modal>
  );
};
