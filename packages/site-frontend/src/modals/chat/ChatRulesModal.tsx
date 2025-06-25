import { Modal } from "@client/comps/modal/Modal";
import { ModalBody } from "@client/comps/modal/ModalBody";
import { ModalHeader } from "@client/comps/modal/ModalHeader";
import { Dialogs } from "@client/services/dialogs";
import { OrderedList } from "@client/comps/list/OrderedList";
import { useIsMobileLayout } from "#app/hooks/style/useIsMobileLayout";
import { Paragraph } from "@client/comps/paragraph/Paragraph";
import { Div } from "@client/comps/div/Div";
import { ModalSection } from "@client/comps/modal/ModalSection";
import { useTranslation } from "@core/services/internationalization/internationalization";

export const ChatRulesModal = () => {
  const {t}  = useTranslation(["chat"]);
  const small = useIsMobileLayout();

  return (
    <Modal
      width={small ? "sm" : "lg"}
      onBackdropClick={() => Dialogs.close("primary")}
    >
      <ModalHeader
        heading={t('chatRulesModal.heading')}
        onCloseClick={() => Dialogs.close("primary")}
        headerContent={ <Paragraph mt={small ? 16: 24}>{t('chatRulesModal.description')}</Paragraph>}
      />
      <ModalBody>
        <Div fx column gap={small ? 20: 32}>
          <ModalSection>
            <OrderedList
              fx
              pl={20}
              mt={1}
              items={[
                t('chatRulesModal.rulesList.item1'),
                t('chatRulesModal.rulesList.item2'),
                t('chatRulesModal.rulesList.item3'),
                t('chatRulesModal.rulesList.item4'),
                t('chatRulesModal.rulesList.item5'),
                t('chatRulesModal.rulesList.item6'),
                t('chatRulesModal.rulesList.item7')
              ]}
            />
          </ModalSection>
        </Div>
      </ModalBody>
    </Modal>
  );
};
