import type { UserLocation } from "../users/UserLocation";

export interface TransactionBetData {
  location: UserLocation;
  edge: number;
  ev: number;
  rainRate: number;
  rainAmount: number;
  commissionRate?: number;
  commissionAmount?: number;
  xpRate: number;
  xp: number;
  gemRate: number;
  gems: number;
}
