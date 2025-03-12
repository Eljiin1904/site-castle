import type { ChestKind } from "./ChestKind";

export interface BasicChest {
  id: string;
  slug: string;
  kind: ChestKind;
  displayName: string;
  imageId: string;
  openCost: number;
}
