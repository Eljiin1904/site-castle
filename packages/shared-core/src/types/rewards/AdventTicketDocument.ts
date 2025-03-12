import type { LootItem } from "../items/BasicItem";

export interface AdventTicketDocument {
  _id: string;
  timestamp: Date;
  userId: string;
  holidayId: string;
  day: number;
  targetValue: number;
  multiplier: number;
  item: LootItem;
}
