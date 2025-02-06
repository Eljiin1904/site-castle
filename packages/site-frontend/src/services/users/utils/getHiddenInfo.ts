import { Users } from "@core/services/users";
import { PlayerUser } from "@core/types/users/PlayerUser";
import { UserRole } from "@core/types/users/UserRole";

export function getHiddenInfo({
  userId,
  role,
  player,
}: {
  userId?: string;
  role: UserRole;
  player: PlayerUser;
}) {
  const { viewHiddenUsers } = Users.getPermissions(role);
  const hidden = player.hidden && !viewHiddenUsers;

  let playerName = player.name;

  if (hidden) {
    playerName = "Hidden";
    if (userId === player.id) {
      playerName += " (You)";
    }
  }

  if (player.hidden && viewHiddenUsers) {
    playerName += " (Hidden)";
  }

  return {
    username: playerName,
    xp: hidden || player.bot ? 0 : player.xp,
    hideInfo: hidden,
  };
}
