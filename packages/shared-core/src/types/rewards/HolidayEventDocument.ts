import type { HolidayChest } from "./HolidayChest";

export interface HolidayEventDocument {
  _id: string;
  displayName: string;
  slug: string;
  startDate: Date;
  endDate: Date;
  chests: HolidayChest[];
  currencyRate: number;
  raffleRate: number;
  boostRate: number;
  createDate: Date;
  adventResetDate: Date;
  adventBonusDays: number[];
}

export interface HolidayEvent {
  id: string;
  displayName: string;
  startDate: Date;
  endDate: Date;
  chests: HolidayChest[];
  currencyRate: number;
  raffleRate: number;
  boostRate: number;
  adventResetDate: Date;
  adventBonusDays: number[];
}
