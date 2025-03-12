import type { RaceWagerReport } from "./RaceWagerReport";
import type { RaceLeader } from "./RaceLeader";
import type { RaceKind } from "./RaceKind";

export interface RaceDocument {
  _id: string;
  kind: RaceKind;
  displayName: string;
  slug: string;
  payouts: number[];
  totalPayout: number;
  createDate: Date;
  startDate: Date;
  endDate: Date;
  leaders: RaceLeader[];
  reports: RaceWagerReport[];
  lastReportDate?: Date;
  processed?: boolean;
  processDate?: Date;
}
