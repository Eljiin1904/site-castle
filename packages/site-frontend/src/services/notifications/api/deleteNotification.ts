import { Http } from "@client/services/http";

export function deleteNotification(data: {
  notificationId: string;
}): Promise<void> {
  return Http.post("/notifications/delete-notification", data);
}