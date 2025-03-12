export interface AffiliateKeyDocument {
  _id: string;
  timestamp: Date;
  affiliateId: string;
  key: string;
  enabled: boolean;
}
