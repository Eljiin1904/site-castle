import type { LootItem } from "../items/BasicItem";
import type { BasicUser } from "../users/BasicUser";
import type { RaffleLeader } from "./RaffleLeader";
import type { RaffleStatusData } from "./RaffleStatus";

export type RaffleState = {
  _id: string;
  displayName: string;
  items: LootItem[];
  round: number;
  startDate: Date;
  endDate: Date;
  status: string;
  statusDate: Date;
  leaders: RaffleLeader[];
  winners: BasicUser[];
  local?: RaffleLeader;
} & RaffleStatusData;
