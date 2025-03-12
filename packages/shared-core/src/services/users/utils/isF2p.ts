import { UserDocument } from "#core/types/users/UserDocument";

export function isF2p(user: UserDocument) {
  return user.meta.lastDepositDate === undefined;
}
