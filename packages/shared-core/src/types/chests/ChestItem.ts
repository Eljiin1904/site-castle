import type { LootItem } from "../items/BasicItem";

export interface ChestItem extends LootItem {
  dropRate: number;
}

export interface ChestItemOptions {
  id: string;
  dropRate: number;
}
