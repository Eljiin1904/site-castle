import type { DoubleColor } from "./DoubleColor";

export interface DoubleRoll {
  value: number;
  color: DoubleColor;
  bait: boolean;
  offset: number;
}
