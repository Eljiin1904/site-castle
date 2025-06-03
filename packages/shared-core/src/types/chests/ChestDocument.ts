import type { ChestItem } from "./ChestItem";
import type { ChestKind } from "./ChestKind";
import type { ChestReport } from "./ChestReport";

export interface ChestDocument {
  _id: string;
  kind: ChestKind;
  edgeRate: number;
  displayName: string;
  slug: string;
  imageId: string;
  items: ChestItem[];
  openCost: number;
  createDate: Date;
  editDate: Date;
  disabled: boolean;
  volatility: number;
  popularity?: number;
}

export interface ChestWithCount extends ChestDocument {
  count: number;
}

export interface ChestWithReport extends ChestDocument, ChestReport {}
