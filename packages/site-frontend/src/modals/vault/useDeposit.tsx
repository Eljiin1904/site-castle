import { Toasts } from "@client/services/toasts";
import { Economy } from "#app/services/economy";
import { useAppSelector } from "#app/hooks/store/useAppSelector";

export function useDeposit() {
  const tfaEnabled = useAppSelector((x) => x.user.tfa.enabled);

  const handler = async ({ tokenAmount }: { tokenAmount: number }) => {
    if (!tfaEnabled) {
      throw new Error("Authenticator must be enabled.");
    }

    await Economy.vaultDeposit({ tokenAmount });

    Toasts.success("Tokens deposited.");
  };

  return handler;
}
