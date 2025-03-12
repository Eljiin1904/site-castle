import type { BasicChest } from "./BasicChest";

export interface ChestReportDocument {
  _id: string;
  timeframe: Date;
  chest: BasicChest;
  players: string[];
  openCount: number;
}

export interface ChestReport {
  _id: string;
  openCount: number;
  playerCount: number;
  ev: number;
  evpp: number;
}
