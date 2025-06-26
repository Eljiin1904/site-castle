import { useIntercomManager } from "#app/hooks/support/useIntercomManager";
import { Heading } from "@client/comps/heading/Heading";
import { Link } from "@client/comps/link/Link";
import { Modal } from "@client/comps/modal/Modal";
import { ModalBody } from "@client/comps/modal/ModalBody";
import { ModalHeader } from "@client/comps/modal/ModalHeader";
import { ModalSection } from "@client/comps/modal/ModalSection";
import { Paragraph } from "@client/comps/paragraph/Paragraph";
import { Dialogs } from "@client/services/dialogs";
import { Div } from "@client/comps/div/Div";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { RegionBlockBanner } from "./RegionBlockBanner";
import { Trans, useTranslation } from "@core/services/internationalization/internationalization";
import { Span } from "@client/comps/span/Span";
import "./RegionBlockModal.scss";

export const RegionBlockModal = () => {
  const intercom = useIntercomManager();
  const {t} = useTranslation(["modals\\region-block"]);
  const bodyLayout = useAppSelector((state) => state.style.bodyLayout);
  const small = bodyLayout === "mobile" || bodyLayout === "tablet";
  
  const handleHelp = () => {
    intercom.handleOpen();
    Dialogs.close("primary");
  };
  
  return (
    <Modal
      className="RegionBlockModal"
      onBackdropClick={() => Dialogs.close("primary")}
    >
      <ModalHeader
        onCloseClick={() => Dialogs.close("primary")}
      />
      <Div fy>
        {['laptop','desktop'].includes(bodyLayout) ? <RegionBlockBanner/> : null}
        <Div
          className={`${`region-block`}-content`}
          column
        >
          <ModalBody justifyContent={'flex-start'}>
            <ModalSection>
              <Heading
                as="h2"
                size={small ? 20 : 24}
                fontWeight="regular"
                textTransform="uppercase"
              >
                {t("title")}
              </Heading>
            </ModalSection>
            <ModalSection>
              <Paragraph>{t('paragraph1')}</Paragraph>
            </ModalSection>
            <ModalSection gap={8}>
              <Heading
                  as="h3"
                  fontWeight="regular"
                  size={small ? 20 : 24}
                >
                {t("notInRestrictedRegion")}
                </Heading>
              <Paragraph>{t('paragraph2')}</Paragraph>
            </ModalSection>
            <ModalSection>
            <Span>
              {
                //@ts-ignore
                <Trans
                  i18nKey="modals\region-block:help"
                  values={{ link: t("liveSupport")}}
                  components={[
                    <Link type="action" fontSize={14} color="sand" onClick={handleHelp}>
                      {t('liveSupport')}
                    </Link>
                  ]}
                />
              }
            </Span>
            </ModalSection>
          </ModalBody>
        </Div>
      </Div>
    </Modal>
  );
};