import { useState, useEffect } from "react";
import { Toasts } from "@client/services/toasts";
import { Users } from "#app/services/users";
import { useAppSelector } from "#app/hooks/store/useAppSelector";

export function useAppMilestones() {
  const authenticated = useAppSelector((x) => x.user.authenticated);
  const xp = useAppSelector((x) => x.user.xp);
  const level = Users.getLevel(xp);
  const [initialized, setInitialized] = useState(false);
  const [lastLevel, setLastLevel] = useState(1);

  useEffect(() => {
    if (!authenticated) {
      setInitialized(false);
    } else if (!initialized) {
      setLastLevel(level);
      setInitialized(true);
    } else if (level !== lastLevel) {
      setLastLevel(level);
      Toasts.success("levelCongrats", 5000, { level: level });
    }
  }, [authenticated, initialized, level, lastLevel]);

  return null;
}
