import { Modal } from "@client/comps/modal/Modal";
import { ModalBody } from "@client/comps/modal/ModalBody";
import { ModalHeader } from "@client/comps/modal/ModalHeader";
import { Dialogs } from "@client/services/dialogs";
import { UnorderedList } from "@client/comps/list/UnorderedList";
import { Paragraph } from "@client/comps/paragraph/Paragraph";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { useIsMobileLayout } from "#app/hooks/style/useIsMobileLayout";
import { useTranslation } from "@core/services/internationalization/internationalization";

export const ChatRainInfoModal = () => {
  const wagerReq = useAppSelector((x) => x.site.settings.rainWagerRequirement);
  const {t}  = useTranslation(["chat"]);
  const small = useIsMobileLayout();
  return (
    <Modal
      width={small ? "sm" : "lg"}
      onBackdropClick={() => Dialogs.close("primary")}
    >
      <ModalHeader
        heading={t('rainInfoModal.heading')}
        onCloseClick={() => Dialogs.close("primary")}
      />
      <ModalBody alignItems="flex-start">
        <Paragraph>{t('rainInfoModal.description')}</Paragraph>
        <UnorderedList
          fx
          items={[
            t('rainInfoModal.list.item1'),
            t('rainInfoModal.list.item2'),
            t('rainInfoModal.list.item3'),
            t('rainInfoModal.list.item4')
          ]}
        />
        <Paragraph>{t('rainInfoModal.requirements')}</Paragraph>
        <UnorderedList
          fx
          items={[
            t('rainInfoModal.requirementsList.item1', {value: {wager: wagerReq}}),
            t('rainInfoModal.requirementsList.item2')
          ]}
        />
      </ModalBody>
    </Modal>
  );
};
