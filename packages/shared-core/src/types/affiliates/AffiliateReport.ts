import { BasicUser } from "../users/BasicUser";

export interface AffiliateReportDocument extends AffiliateReport {
  _id: string;
  timeframe: Date;
  affiliateId: string;
  userId: string;
}

export interface AffiliateReport {
  xp?: number;
  commissionAmount?: number;
  commissionBalance?: number;
  wagerAmount?: number;
  depositAmount?: number;
  rewardAmount?: number;
}

export interface AffiliateReportWithMeta extends Required<AffiliateReport> {
  user: BasicUser;
  referDate: Date;
  activeDate: Date;
  firstDepositDate: Date;
  lastDepositDate: Date;
  lastBetDate: Date;
  removed?: boolean;
  removeDate?: Date;
}