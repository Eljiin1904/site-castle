import { useState } from "react";
import { Dialogs } from "@client/services/dialogs";
import { GiftBatchDocument } from "@core/types/economy/GiftBatchDocument";
import { Conditional } from "@client/comps/conditional/Conditional";
import { Modal } from "@client/comps/modal/Modal";
import { ModalHeader } from "@client/comps/modal/ModalHeader";
import { InfoBody } from "./info/InfoBody";
import { CardBody } from "./cards/CardBody";
import { ExportBody } from "./export/ExportBody";
import { GiftBatchAction } from "./GiftBatchAction";

export const GiftBatchModal = ({ batch }: { batch: GiftBatchDocument }) => {
  const [action, setAction] = useState<GiftBatchAction>("info");

  return (
    <Modal
      className="GiftBatchModal"
      width="sm"
      fixedHeight="632px"
      onBackdropClick={() => Dialogs.close("primary")}
    >
      <ModalHeader
        onCloseClick={() => Dialogs.close("primary")}
        heading={[
          {
            label: "Info",
            active: action === "info",
            onClick: () => setAction("info"),
          },
          {
            label: "Cards",
            active: action === "cards",
            onClick: () => setAction("cards"),
          },
          {
            label: "Export",
            active: action === "export",
            onClick: () => setAction("export"),
          },
        ]}
      />
      <Conditional
        value={action}
        info={<InfoBody batch={batch} />}
        cards={<CardBody batch={batch} />}
        export={<ExportBody batch={batch} />}
      />
    </Modal>
  );
};
