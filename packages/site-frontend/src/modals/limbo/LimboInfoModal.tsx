import { Intimal } from "@core/services/intimal";
import { Modal } from "@client/comps/modal/Modal";
import { ModalBody } from "@client/comps/modal/ModalBody";
import { ModalHeader } from "@client/comps/modal/ModalHeader";
import { Dialogs } from "@client/services/dialogs";
import { UnorderedList } from "@client/comps/list/UnorderedList";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { Limbo } from "#app/services/limbo";

export const LimboInfoModal = () => {
  const xpRate = useAppSelector((x) => x.site.settings.limboXpRate);
  const rtp = 1 - Limbo.edgeRate;

  return (
    <Modal
      width="sm"
      onBackdropClick={() => Dialogs.close("primary")}
    >
      <ModalHeader
        heading="Limbo Rules"
        onCloseClick={() => Dialogs.close("primary")}
      />
      <ModalBody>
        <UnorderedList
          fx
          itemSize={14}
          items={[
            "Min multiplier is 1.01x.",
            "Max multiplier is 1,000,000x.",
            `Max profit is ${Intimal.toLocaleString(Limbo.maxProfit, 0)} tokens.`,
            `RTP is ${rtp * 100}%.`,
            `1.00 tokens wagered = ${xpRate.toFixed(2)} XP.`,
          ]}
        />
      </ModalBody>
    </Modal>
  );
};
