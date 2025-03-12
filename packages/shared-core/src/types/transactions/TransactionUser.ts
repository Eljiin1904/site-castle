import type { BasicUser } from "../users/BasicUser";

export interface TransactionUser extends BasicUser {
  churned: boolean;
  f2p: boolean;
}
