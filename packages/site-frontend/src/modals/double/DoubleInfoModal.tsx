import { Intimal } from "@core/services/intimal";
import { Modal } from "@client/comps/modal/Modal";
import { ModalBody } from "@client/comps/modal/ModalBody";
import { ModalHeader } from "@client/comps/modal/ModalHeader";
import { Dialogs } from "@client/services/dialogs";
import { UnorderedList } from "@client/comps/list/UnorderedList";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { Double } from "#app/services/double";

export const DoubleInfoModal = () => {
  const xpRate = useAppSelector((x) => x.site.settings.doubleXpRate);
  const rtp = 1 - Double.edgeRate;

  return (
    <Modal
      width="sm"
      onBackdropClick={() => Dialogs.close("primary")}
    >
      <ModalHeader
        heading="Double Rules"
        onCloseClick={() => Dialogs.close("primary")}
      />
      <ModalBody>
        <UnorderedList
          fx
          itemSize={14}
          items={[
            "You can't bet more than once per color, per round.",
            "You can't bet on both CT and T in the same round.",
            `CT and T max bet is ${Intimal.toLocaleString(Double.getMaxBetAmount("red"), 0)} tokens.`,
            `Bait max bet is ${Intimal.toLocaleString(Double.getMaxBetAmount("bait"), 0)} tokens.`,
            `Green max bet is ${Intimal.toLocaleString(Double.getMaxBetAmount("green"), 0)} tokens.`,
            `RTP is ${rtp * 100}%.`,
            `1.00 tokens wagered = ${xpRate.toFixed(2)} XP.`,
          ]}
        />
      </ModalBody>
    </Modal>
  );
};
