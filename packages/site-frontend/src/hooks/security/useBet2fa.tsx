import { useEventCallback } from "usehooks-ts";
import { waitForBet2fa } from "#app/modals/security/AuthenticatorBetModal";
import { useAppSelector } from "../store/useAppSelector";
import { useBetSession } from "./useBetSession";

export function useBet2fa() {
  const { getToken, setToken } = useBetSession();
  const tfaEnabled = useAppSelector((x) => x.user.tfa.enabled);
  const tfaRequired = useAppSelector((x) => x.user.settings.bet2fa);

  const handler = useEventCallback(async () => {
    if (!tfaEnabled || !tfaRequired) {
      return undefined;
    }

    const token = getToken();

    if (token) {
      return token;
    }

    const betToken = await waitForBet2fa();

    if (!betToken) {
      throw new Error("Bet 2fa is required.");
    }

    setToken(betToken);

    return betToken;
  });

  return handler;
}
