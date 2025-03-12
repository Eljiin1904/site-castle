import { BasicUser } from "#core/types/users/BasicUser";
import { UserDocument } from "#core/types/users/UserDocument";

export function getBasicUser(user: UserDocument): BasicUser {
  return {
    id: user._id,
    name: user.username,
    role: user.role,
    tags: user.tags,
    avatarIndex: user.avatarIndex,
    avatarId: user.avatarId,
    xp: user.xp,
    hidden: user.settings?.hiddenMode,
  };
}
