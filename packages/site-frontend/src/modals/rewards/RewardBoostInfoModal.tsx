import { Img } from "@client/comps/img/Img";
import { Modal } from "@client/comps/modal/Modal";
import { ModalBody } from "@client/comps/modal/ModalBody";
import { ModalHeader } from "@client/comps/modal/ModalHeader";
import { ModalSection } from "@client/comps/modal/ModalSection";
import { Paragraph } from "@client/comps/paragraph/Paragraph";
import { UnorderedList } from "@client/comps/list/UnorderedList";
import { Dialogs } from "@client/services/dialogs";

export const RewardBoostInfoModal = () => {
  return (
    <Modal
      width="sm"
      onBackdropClick={() => Dialogs.close("primary")}
    >
      <ModalHeader
        heading="Reward Boosts"
        onCloseClick={() => Dialogs.close("primary")}
      />
      <ModalBody gap={16}>
        <Img
          type="png"
          path="/graphics/rewards-overview-boosts"
          width="200px"
        />
        <ModalSection>
          <Paragraph>
            {"We calculate your boost using these factors:"}
          </Paragraph>
          <UnorderedList
            items={[
              "Account level",
              "XP gains from the last 45 days",
              "Losses from the last 45 days",
            ]}
          />
          <Paragraph color="light-blue">
            {
              "Stay active and make sure to claim your boosts to avoid losing them!"
            }
          </Paragraph>
        </ModalSection>
      </ModalBody>
    </Modal>
  );
};
