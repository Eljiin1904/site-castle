import { NotificationDocument } from "@core/types/notifications/NotificationDocument";
import { Toasts } from "@client/services/toasts";
import { getToastKind } from "./getToastKind";
import { getMessage } from "./getMessage";

export function toast(notification: NotificationDocument) {
  const kind = getToastKind(notification);
  const message = getMessage(notification);

  Toasts[kind](message);
}
