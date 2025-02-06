import { useEffect } from "react";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { useIntercomManager } from "#app/hooks/support/useIntercomManager";

export function useAppSupport() {
  const authenticated = useAppSelector((x) => x.user.authenticated);
  const { handleShutdown } = useIntercomManager();

  useEffect(() => {
    handleShutdown();
  }, [authenticated]);

  return null;
}
