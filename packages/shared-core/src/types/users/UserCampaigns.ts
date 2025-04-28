export interface UserCampaigns {
  _id: string;
  timestamp: Date;
  userId: string;
  campaignName: string;
  campaignId: string;
  commissionRate: number;
  campaignTier: number;
  totalDeposit?: number;
  referralCount?: number;
  commissionBalance?: number;
  commissionTotal: number;
  campaignHits?: number;
  referralXp: number;
  wagerAmount?: number;
  default: boolean;
}
