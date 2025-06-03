import { Intimal } from "@core/services/intimal";
import { Modal } from "@client/comps/modal/Modal";
import { ModalBody } from "@client/comps/modal/ModalBody";
import { ModalHeader } from "@client/comps/modal/ModalHeader";
import { Dialogs } from "@client/services/dialogs";
import { UnorderedList } from "@client/comps/list/UnorderedList";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { useTranslation } from "@core/services/internationalization/internationalization";
import { Crash } from "@core/services/crash";

export const CrashInfoModal = () => {
  const {t} = useTranslation(["games\\crash"]);
  const xpRate = useAppSelector((x) => x.site.settings.crashXpRate);
  const rtp = 1 - Crash.edgeRate;

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
            t("rules.rule2"),
            t("rules.rule3",{max:Intimal.toLocaleString(Crash.maxProfit, 0)}),
            t("rules.rule4",{percent: rtp * 100}),
            t("rules.rule5",{exp: xpRate.toFixed(2)})
          ]}
        />
      </ModalBody>
    </Modal>
  );
};
