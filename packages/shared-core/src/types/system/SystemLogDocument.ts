import type { SystemKind } from "./SystemKind";
import type { SystemLogKindData } from "./SystemLogKind";

export type SystemLogDocument = {
  _id: string;
  timestamp: Date;
  system: SystemKind;
  message: string;
} & SystemLogKindData;
