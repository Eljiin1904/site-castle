export interface SiteStatsDocument {
  _id: string;
  timestamp: Date;
  newUsers: number;
  activeUsers: number;
  betCount: number;
  betAmount: number;
  commissionAmount: number;
  rewardAmount: number;
  biggestWin: number;
  rainAmount: number;
  depositAmount: number;
  withdrawAmount: number;
  depositSkinAmount: number;
  withdrawSkinAmount: number;
}
