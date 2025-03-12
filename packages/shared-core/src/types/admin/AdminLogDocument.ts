import type { BasicUser } from "../users/BasicUser";
import type { AdminLogKindData } from "./AdminLogKind";

export type AdminLogDocument = {
  _id: string;
  timestamp: Date;
  admin: BasicUser;
} & AdminLogKindData;
