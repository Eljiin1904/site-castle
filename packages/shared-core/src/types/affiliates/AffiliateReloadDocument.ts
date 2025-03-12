import type { BasicUser } from "../users/BasicUser";

export interface AffiliateReloadDocument {
  _id: string;
  createDate: Date;
  user: BasicUser;
  tokenAmount: number;
  resetDate: Date;
  claimsAvailable: number;
  claimsStart: number;
  lastClaimDate?: Date;
}
