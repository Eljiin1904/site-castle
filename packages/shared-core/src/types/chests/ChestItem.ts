import type { LootItem } from "../items/BasicItem";

export interface ChestItem extends LootItem {
  dropRate: number;
  announce: boolean;
  jackpot: boolean;
  special: boolean;
}

export interface ChestItemOptions {
  id: string;
  dropRate: number;
  announce: boolean;
  jackpot: boolean;
  special: boolean;
}
