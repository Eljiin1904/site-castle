import config from "#core/config";

interface UserLike {
  avatarId?: string;
  avatarIndex: number;
}

export function getAvatarUrl(user: UserLike) {
  if (user.avatarId) {
    return `${config.staticURL}/avatars/${user.avatarId}.jpg`;
  } else {
    return `${config.staticURL}/avatars-default/${user.avatarIndex.toString().padStart(3, "0")}.jpg`;
  }
}
