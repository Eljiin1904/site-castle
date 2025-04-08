import { Intimal } from "@core/services/intimal";
import { Modal } from "@client/comps/modal/Modal";
import { ModalBody } from "@client/comps/modal/ModalBody";
import { ModalHeader } from "@client/comps/modal/ModalHeader";
import { Dialogs } from "@client/services/dialogs";
import { UnorderedList } from "@client/comps/list/UnorderedList";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { Double } from "#app/services/double";
import { useTranslation } from "@core/services/internationalization/internationalization";

export const DoubleInfoModal = () => {
  
  const {t} = useTranslation(["games\\double"]);
  const xpRate = useAppSelector((x) => x.site.settings.doubleXpRate);
  const rtp = 1 - Double.edgeRate;

  return (
    <Modal
      width="sm"
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
            t("rules.rule1"),
            t("rules.rule2",{tokens: Intimal.toLocaleString(Double.getMaxBetAmount("red"), 0)}),
            t("rules.rule3",{tokens: Intimal.toLocaleString(Double.getMaxBetAmount("bait"), 0)}),
            t("rules.rule4",{tokens: Intimal.toLocaleString(Double.getMaxBetAmount("green"), 0)}),
            t("rules.rule5", { percent: rtp * 100 }),
            t("rules.rule6", { exp: xpRate.toFixed(2) }),
          ]}
        />
      </ModalBody>
    </Modal>
  );
};
