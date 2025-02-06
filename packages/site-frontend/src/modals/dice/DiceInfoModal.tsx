import { Intimal } from "@core/services/intimal";
import { Modal } from "@client/comps/modal/Modal";
import { ModalBody } from "@client/comps/modal/ModalBody";
import { ModalHeader } from "@client/comps/modal/ModalHeader";
import { Dialogs } from "@client/services/dialogs";
import { UnorderedList } from "@client/comps/list/UnorderedList";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { Dice } from "#app/services/dice";

export const DiceInfoModal = () => {
  const xpRate = useAppSelector((x) => x.site.settings.diceXpRate);
  const rtp = 1 - Dice.edgeRate;

  return (
    <Modal
      width="sm"
      onBackdropClick={() => Dialogs.close("primary")}
    >
      <ModalHeader
        heading="Dice Rules"
        onCloseClick={() => Dialogs.close("primary")}
      />
      <ModalBody>
        <UnorderedList
          fx
          itemSize={14}
          items={[
            "Min multiplier is 1.0105x.",
            "Max multiplier is 9600x.",
            `Max profit is ${Intimal.toLocaleString(Dice.maxProfit, 0)} tokens.`,
            `RTP is ${rtp * 100}%.`,
            `1.00 tokens wagered = ${xpRate.toFixed(2)} XP.`,
          ]}
        />
      </ModalBody>
    </Modal>
  );
};
