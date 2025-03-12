import type { BasicUser } from "../users/BasicUser";
import type { UserAffiliateData } from "../users/UserAffiliateData";

export interface AffiliateLeader {
  user: BasicUser;
  affiliate: UserAffiliateData;
}
