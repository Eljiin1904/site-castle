import { UserCasesOpened } from "./UserCasesOpened";
import type { UserLocation } from "./UserLocation";

export interface UserMetaData {
  activeDate: Date;
  lastLocation?: UserLocation;
  profitLoss?: number;
  levelCaseValue?: number;
  levelCaseBalance?: number;
  lastBetDate?: Date;
  lastDepositDate?: Date;
  firstDepositDate?: Date;
  lastWithdrawDate?: Date;
  firstWithdrawDate?: Date;
  reactivateDate?: Date;
  lastMessageDate?: Date;
  lastRainId?: string;
  nextRainWager?: number;
  tipLimit?: number;
  pendingReferralCode?: string;
  socialUrl?: string;
  reloadsEnabled?: boolean;
  steamTradeUrl?: string;
  wagerRequirement?: number;
  casesOpened?: UserCasesOpened;
}
