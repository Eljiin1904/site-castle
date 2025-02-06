import { useIntercom } from "react-use-intercom";
import { Heading } from "@client/comps/heading/Heading";
import { Link } from "@client/comps/link/Link";
import { Modal } from "@client/comps/modal/Modal";
import { ModalBody } from "@client/comps/modal/ModalBody";
import { ModalHeader } from "@client/comps/modal/ModalHeader";
import { ModalSection } from "@client/comps/modal/ModalSection";
import { Paragraph } from "@client/comps/paragraph/Paragraph";
import { Dialogs } from "@client/services/dialogs";

export const RegionBlockModal = () => {
  const intercom = useIntercom();

  const handleHelp = () => {
    intercom.show();
    Dialogs.close("primary");
  };

  return (
    <Modal
      width="sm"
      disableMobileFullscreen
      onBackdropClick={() => Dialogs.close("primary")}
    >
      <ModalHeader
        heading="Region Restricted"
        onCloseClick={() => Dialogs.close("primary")}
      />
      <ModalBody gap={16}>
        <ModalSection>
          <Paragraph>
            {
              "Castle.com is unavailable in your region. You will not have access to any of our features."
            }
          </Paragraph>
        </ModalSection>
        <ModalSection mt={4}>
          <Heading>{"Not in a restricted region?"}</Heading>
          <Paragraph mt={12}>
            {
              "If you are using a VPN or proxy service, try turning it off or switching to a supported region."
            }
          </Paragraph>
        </ModalSection>
        <ModalSection
          borderTop
          pt={16}
        >
          <Paragraph>
            {"If you need help, please contact our "}
            <Link
              type="action"
              onClick={handleHelp}
            >
              {"live support"}
            </Link>
          </Paragraph>
        </ModalSection>
      </ModalBody>
    </Modal>
  );
};
