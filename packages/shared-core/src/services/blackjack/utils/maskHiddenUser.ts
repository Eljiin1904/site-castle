import { BasicUser } from "#core/types/users/BasicUser";

export function maskHiddenUser(user: BasicUser, { mask = true } = {}) {
  return user.hidden && mask
    ? {
        name: "Hidden",
        xp: 0,
      }
    : user;
}
