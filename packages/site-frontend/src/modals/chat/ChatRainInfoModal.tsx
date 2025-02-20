import { Modal } from "@client/comps/modal/Modal";
import { ModalBody } from "@client/comps/modal/ModalBody";
import { ModalHeader } from "@client/comps/modal/ModalHeader";
import { Dialogs } from "@client/services/dialogs";
import { UnorderedList } from "@client/comps/list/UnorderedList";
import { Paragraph } from "@client/comps/paragraph/Paragraph";
import { useAppSelector } from "#app/hooks/store/useAppSelector";

export const ChatRainInfoModal = () => {
  const wagerReq = useAppSelector((x) => x.site.settings.rainWagerRequirement);

  return (
    <Modal
      width="sm"
      onBackdropClick={() => Dialogs.close("primary")}
    >
      <ModalHeader
        heading="Chat Rain"
        onCloseClick={() => Dialogs.close("primary")}
      />
      <ModalBody gap={8}>
        <Paragraph>
          {
            "Chat rain tokens are distributed to all. Boost your share by doing the following:"
          }
        </Paragraph>
        <UnorderedList
          fx
          itemSize={14}
          items={[
            "Play. The higher your XP gained in the last 7 days, the higher your share.",
            "Level Up. The higher your level, the higher your share.",
            "Deposit at least 20 tokens in the last 30 days.",
            "Wager at least 1,000 tokens in the last 30 days.",
            // "Complete KYC tier 2.",
          ]}
        />
        <Paragraph>
          {"To join the rain, you must meet the following requirements:"}
        </Paragraph>
        <UnorderedList
          fx
          itemSize={14}
          items={[
            `Wager at least ${wagerReq} tokens in the last 7 days.`,
            "Wager at least 1x your previous rain payout.",
          ]}
        />
      </ModalBody>
    </Modal>
  );
};
