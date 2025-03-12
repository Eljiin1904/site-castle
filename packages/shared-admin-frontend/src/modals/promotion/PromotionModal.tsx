import { useState } from "react";
import { PromotionCodeDocument } from "@core/types/economy/PromotionCodeDocument";
import { Modal } from "@client/comps/modal/Modal";
import { ModalHeader } from "@client/comps/modal/ModalHeader";
import { Conditional } from "@client/comps/conditional/Conditional";
import { Dialogs } from "@client/services/dialogs";
import { InfoBody } from "./info/InfoBody";
import { TicketBody } from "./tickets/TicketBody";
import { CancelBody } from "./cancel/CancelBody";
import { PromotionAction } from "./PromotionAction";

export const PromotionModal = ({
  promotion,
  onCancel,
}: {
  promotion: PromotionCodeDocument;
  onCancel: () => void;
}) => {
  const [action, setAction] = useState<PromotionAction>("info");

  return (
    <Modal
      className="PromotionModal"
      width="sm"
      fixedHeight="708px"
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
            label: "Tickets",
            active: action === "tickets",
            onClick: () => setAction("tickets"),
          },
          {
            label: "Cancel",
            active: action === "cancel",
            onClick: () => setAction("cancel"),
          },
        ]}
      />
      <Conditional
        value={action}
        info={<InfoBody promotion={promotion} />}
        tickets={<TicketBody promotion={promotion} />}
        cancel={
          <CancelBody
            promotion={promotion}
            onCancel={onCancel}
          />
        }
      />
    </Modal>
  );
};
