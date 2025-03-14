import { Modal } from "@client/comps/modal/Modal";
import { ModalBody } from "@client/comps/modal/ModalBody";
import { ModalHeader } from "@client/comps/modal/ModalHeader";
import { Dialogs } from "@client/services/dialogs";
import { OrderedList } from "@client/comps/list/OrderedList";
import { useIsMobileLayout } from "#app/hooks/style/useIsMobileLayout";
import { Paragraph } from "@client/comps/paragraph/Paragraph";
import { Div } from "@client/comps/div/Div";
import { ModalSection } from "@client/comps/modal/ModalSection";

export const ChatRulesModal = () => {
  
  const small = useIsMobileLayout();

  return (
    <Modal
      width={small ? "sm" : "lg"}
      onBackdropClick={() => Dialogs.close("primary")}
    >
      <ModalHeader
        heading="Chat Rules"
        onCloseClick={() => Dialogs.close("primary")}
        headerContent={ <Paragraph color="dark-sand" mt={small ? 16: 24}>
          {"Learn more about our chat rules. Any behaviour against rules might be banned."}
        </Paragraph>}
      />
      <ModalBody pt={0}>
        <Div fx column gap={small ? 20: 32} pt={small ? 24: 32}  borderTop borderColor="brown-4">
          <ModalSection>
            <OrderedList
              fx
              itemSize={14}
              pl={20}
              mt={1}
              items={[
                "Don't spam & don't use excessive capital letters when chatting.",
                "Don't harass or be offensive to other users or Stake staff.",
                "Don't share any personal information (including socials) of you or other players.",
                "Don't beg or ask for loans, rains or tips.",
                "Don't use alternative (alts) accounts on chat, that is strictly forbidden.",
                "No suspicious behavior that can be seen as potential scams.",
                "Don't engage in any forms of advertising/trading/selling/buying or offering services."
              ]}
            />
          </ModalSection>
        </Div>
      </ModalBody>
    </Modal>
  );
};
