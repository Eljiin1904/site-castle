import type { UserRole } from "../users/UserRole";
import type { UserTag } from "../users/UserTag";

export interface TransactionAffiliate {
  id: string;
  name: string;
  role: UserRole;
  tags: UserTag[];
  tier: number;
  pending?: boolean;
}
