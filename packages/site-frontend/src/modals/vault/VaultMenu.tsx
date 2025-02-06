import { ButtonNav } from "@client/comps/button/ButtonNav";
import { VaultAction } from "./VaultAction";

export const VaultMenu = ({
  action,
  setAction,
}: {
  action: VaultAction;
  setAction: (x: VaultAction) => void;
}) => {
  return (
    <ButtonNav
      disabled={false}
      options={[
        {
          label: "Deposit",
          active: action === "deposit",
          onClick: () => setAction("deposit"),
        },
        {
          label: "Withdraw",
          active: action === "withdraw",
          onClick: () => setAction("withdraw"),
        },
      ]}
    />
  );
};
