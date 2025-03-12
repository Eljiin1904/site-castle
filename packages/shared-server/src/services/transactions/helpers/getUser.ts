import { UserDocument } from "@core/types/users/UserDocument";
import { Users } from "#server/services/users";
import { TransactionUser } from "@core/types/transactions/TransactionUser";

export function getUser(user: UserDocument): TransactionUser {
  return {
    ...Users.getBasicUser(user),
    tags: user.tags,
    churned: Users.isChurned(user),
    f2p: Users.isF2p(user),
  };
}
