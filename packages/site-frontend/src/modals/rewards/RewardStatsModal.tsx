import { Modal } from "@client/comps/modal/Modal";
import { Dialogs } from "@client/services/dialogs";
import { StatCards } from "./StatCards";
import { StatBanner } from "./StatBanner";

export const RewardStatsModal = () => {
  return (
    <Modal
      width="lg"
      onBackdropClick={() => Dialogs.close("primary")}
    >
      <StatBanner onCloseClick={() => Dialogs.close("primary")} />
      <StatCards />
    </Modal>
  );
};
