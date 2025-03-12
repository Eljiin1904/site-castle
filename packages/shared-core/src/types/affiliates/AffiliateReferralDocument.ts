export interface AffiliateReferralDocument {
  _id: string;
  timestamp: Date;
  affiliateId: string;
  userId: string;
  removed?: boolean;
  removeDate?: Date;
}
