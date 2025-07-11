import postMockCards from "#app/services/blackjack/api/postMockCards";
import { Button } from "@client/comps/button/Button";
import { Div } from "@client/comps/div/Div";
import { TextInput } from "@client/comps/input/TextInput";
import { UnorderedList } from "@client/comps/list/UnorderedList";
import { Modal } from "@client/comps/modal/Modal";
import { ModalBody } from "@client/comps/modal/ModalBody";
import { ModalHeader } from "@client/comps/modal/ModalHeader";
import { Dialogs } from "@client/services/dialogs";
import { Toasts } from "@client/services/toasts";
import { useTranslation } from "@core/services/internationalization/internationalization";
import { useCallback, useState } from "react";

export const BlackjackDebugModal = () => {
  
  const {t} = useTranslation("games\\blackjack");
  const [val, setVal] = useState("");

  const onSubmit = useCallback(
    () => {
      const split = val.split(",").map((s) => s.trim());
      if (!split.length) return void Toasts.error("No cards entered");
      postMockCards({ cardAbbrevAr: split }).then(() => {
        Toasts.info("Mock cards set");
        Dialogs.close("primary");
      });
    },
    [val], // this is likely pointless
  );

  const onChange = useCallback(
    (inputVal: string | undefined) => {
      setVal(inputVal || "");
    },
    [setVal],
  );

  return (
    <Modal
      width="lg"
      disableMobileFullscreen
      onBackdropClick={() => Dialogs.close("primary")}
    >
      <ModalHeader
        heading={t("debugModal.title")}
        onCloseClick={() => Dialogs.close("primary")}
      />
      <ModalBody>
        <Div>
        {t("debugModal.description")}
        </Div>
        <UnorderedList
          fx
          itemSize={14}
          items={[
            t("debugModal.list.card1"),
            t("debugModal.list.card2"),
            t("debugModal.list.card3"),
            t("debugModal.list.card4"),
            t("debugModal.list.card5"),
            t("debugModal.list.cardn")
          ]}
        />

        <TextInput
          placeholder="AS, 2H, 3D, 10C"
          type="text"
          value={val}
          onChange={onChange}
        />

        <Button
          kind="primary-yellow"
          onClick={onSubmit}
          fx
        >
         {t('common:submit')}
        </Button>
      </ModalBody>
    </Modal>
  );
};