import type { BasicChest } from "../chests/BasicChest";

export interface HolidayChest extends BasicChest {
  holidayCost: number;
}

export interface HolidayChestOptions {
  id: string;
  holidayCost: number;
}
