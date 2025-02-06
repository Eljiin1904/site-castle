import { useMemo } from "react";
import { Users } from "#app/services/users";
import { useAppSelector } from "../store/useAppSelector";

export function useUserLevel() {
  const xp = useAppSelector((x) => x.user.xp);

  const state = useMemo(() => {
    const level = Users.getLevel(xp || 0);
    const levelStartXp = Users.getXP(level);
    const levelEndXp = Users.getXP(level + 1);

    return {
      xp,
      level,
      levelProgress: xp - levelStartXp,
      levelGoal: levelEndXp - levelStartXp,
    };
  }, [xp]);

  return state;
}
