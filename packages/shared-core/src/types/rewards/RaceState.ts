import type { RaceKind } from "./RaceKind";
import type { RaceLeader } from "./RaceLeader";

export interface RaceState {
  _id: string;
  kind: RaceKind;
  displayName: string;
  totalPayout: number;
  startDate: Date;
  endDate: Date;
  lastReportDate?: Date;
  leaders: RaceLeader[];
  local?: RaceLeader;
}
