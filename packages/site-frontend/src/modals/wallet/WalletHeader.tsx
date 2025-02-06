import { ModalHeader } from "@client/comps/modal/ModalHeader";
import { Dialogs } from "@client/services/dialogs";
import { WalletAction } from "./WalletAction";

export const WalletHeader = ({
  action,
  setAction,
}: {
  action: WalletAction;
  setAction: (x: WalletAction) => void;
}) => {
  return (
    <ModalHeader
      onCloseClick={() => Dialogs.close("primary")}
      heading={[
        {
          label: "Deposit",
          active: action.startsWith("deposit"),
          onClick: () => setAction("deposit"),
        },
        {
          label: "Withdraw",
          active: action.startsWith("withdraw"),
          onClick: () => setAction("withdraw"),
        },
      ]}
    />
  );
};
