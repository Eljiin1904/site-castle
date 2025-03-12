import { NotificationDocument } from "@core/types/notifications/NotificationDocument";
import {
  NotificationKind,
  NotificationKindData,
} from "@core/types/notifications/NotificationKind";
import { Database } from "#server/services/database";
import { Ids } from "#server/services/ids";

export async function createNotification(
  data: {
    userId: string;
    kind: NotificationKind;
  } & NotificationKindData,
) {
  const notification: NotificationDocument = {
    _id: Ids.object(),
    timestamp: new Date(),
    ...data,
  };

  await Database.collection("notifications").insertOne(notification);

  return notification;
}
