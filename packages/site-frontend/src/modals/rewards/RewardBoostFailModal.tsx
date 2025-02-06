import { Img } from "@client/comps/img/Img";
import { Modal } from "@client/comps/modal/Modal";
import { ModalBody } from "@client/comps/modal/ModalBody";
import { ModalHeader } from "@client/comps/modal/ModalHeader";
import { ModalSection } from "@client/comps/modal/ModalSection";
import { Paragraph } from "@client/comps/paragraph/Paragraph";
import { Dialogs } from "@client/services/dialogs";

export const RewardBoostFailModal = () => {
  return (
    <Modal
      width="sm"
      onBackdropClick={() => Dialogs.close("primary")}
    >
      <ModalHeader
        heading="No Boost Available"
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
            {
              "You haven't played enough in the last 45 days to be eligible for a daily boost."
            }
          </Paragraph>
          <br />
          <Paragraph color="light-blue">
            {"Try playing more or come back for your weekly or monthly boost!"}
          </Paragraph>
        </ModalSection>
      </ModalBody>
    </Modal>
  );
};
