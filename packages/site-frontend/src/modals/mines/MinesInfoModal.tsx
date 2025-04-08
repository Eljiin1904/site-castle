import { Intimal } from "@core/services/intimal";
import { Modal } from "@client/comps/modal/Modal";
import { ModalBody } from "@client/comps/modal/ModalBody";
import { ModalHeader } from "@client/comps/modal/ModalHeader";
import { Dialogs } from "@client/services/dialogs";
import { UnorderedList } from "@client/comps/list/UnorderedList";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { Mines } from "#app/services/mines";
import { useTranslation } from "@core/services/internationalization/internationalization";

export const MinesInfoModal = () => {
  const xpRate = useAppSelector((x) => x.site.settings.minesXpRate);
  const {t} = useTranslation(["games\\mines"]);
  const rtp = 1 - Mines.edgeRate;

  return (
    <Modal
      width="sm"
      disableMobileFullscreen
      onBackdropClick={() => Dialogs.close("primary")}
    >
      <ModalHeader
        heading={t("rules.title")}
        onCloseClick={() => Dialogs.close("primary")}
      />
      <ModalBody>
        <UnorderedList
          fx
          itemSize={14}
          items={[
            t("rules.rule1",{max:Intimal.toLocaleString(Mines.maxProfit, 0)}),
            t("rules.rule2",{percent: rtp * 100}),
            t("rules.rule3",{exp: xpRate.toFixed(2)})
          ]}
        />
      </ModalBody>
    </Modal>
  );
};
