import { Navigate } from "react-router-dom";
import { useMount } from "@client/hooks/system/useMount";
import { Dialogs } from "@client/services/dialogs";
import { WalletModal } from "#app/modals/wallet/WalletModal";

export function UserRedeemPage() {
  useMount(() => {
    Dialogs.open("primary", <WalletModal initialAction="depositGiftCard" />);
  });

  return (
    <Navigate
      replace
      to="/"
    />
  );
}
