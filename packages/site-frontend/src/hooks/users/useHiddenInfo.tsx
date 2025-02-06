import { PlayerUser } from "@core/types/users/PlayerUser";
import { getHiddenInfo } from "#app/services/users/utils/getHiddenInfo";
import { useAppSelector } from "../store/useAppSelector";

export function useHiddenInfo(player: PlayerUser) {
  const userId = useAppSelector((x) => x.user._id);
  const role = useAppSelector((x) => x.user.role);

  return getHiddenInfo({
    userId,
    role,
    player,
  });
}
