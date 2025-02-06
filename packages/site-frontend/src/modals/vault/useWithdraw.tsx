import { Toasts } from "@client/services/toasts";
import { Economy } from "#app/services/economy";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { waitForAuthenticatorCode } from "../security/AuthenticatorCodeModal";

export function useWithdraw() {
  const tfaEnabled = useAppSelector((x) => x.user.tfa.enabled);

  const handler = async ({ tokenAmount }: { tokenAmount: number }) => {
    if (!tfaEnabled) {
      throw new Error("Authenticator must be enabled.");
    }

    const tfac = await waitForAuthenticatorCode();

    await Economy.vaultWithdraw({ tokenAmount, tfac });

    Toasts.success("Tokens withdrawn.");
  };

  return handler;
}
