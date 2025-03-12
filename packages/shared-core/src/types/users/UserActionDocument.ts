import type { BasicUser } from "./BasicUser";
import type { UserActionKind, UserActionKindData } from "./UserActionKind";
import type { UserLocation } from "./UserLocation";

export type UserActionDocument = {
  _id: string;
  timestamp: Date;
  user: BasicUser;
  kind: UserActionKind;
  location: UserLocation;
} & UserActionKindData;
