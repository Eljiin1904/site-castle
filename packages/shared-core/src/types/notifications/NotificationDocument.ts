import type {
  NotificationKind,
  NotificationKindData,
} from "./NotificationKind";

export type NotificationDocument = {
  _id: string;
  timestamp: Date;
  userId: string;
  kind: NotificationKind;
} & NotificationKindData;
