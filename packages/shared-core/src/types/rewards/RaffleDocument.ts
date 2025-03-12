import type { LootItem } from "../items/BasicItem";
import type { BasicUser } from "../users/BasicUser";
import type { RaffleLeader } from "./RaffleLeader";
import type { RaffleReport } from "./RaffleReport";
import type { RaffleStatusData } from "./RaffleStatus";

export type RaffleDocument = {
  _id: string;
  displayName: string;
  slug: string;
  items: LootItem[];
  totalValue: number;
  ticketCount: number;
  round: number;
  createDate: Date;
  startDate: Date;
  endDate: Date;
  serverSeed: string;
  serverSeedHash: string;
  status: string;
  statusDate: Date;
  reports: RaffleReport[];
  leaders: RaffleLeader[];
  lastReportDate?: Date;
  winners: BasicUser[];
} & RaffleStatusData;
