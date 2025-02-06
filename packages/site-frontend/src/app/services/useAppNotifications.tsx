import { useAppDispatch } from "#app/hooks/store/useAppDispatch";
import { Notifications } from "#app/services/notifications";
import { useSocketListener } from "#app/hooks/sockets/useSocketListener";

export const useAppNotifications = () => {
  const dispatch = useAppDispatch();

  useSocketListener("notifications-init", (log) => {
    dispatch(Notifications.setLog(log));
  });

  useSocketListener("notifications-insert", (notification) => {
    dispatch(Notifications.addNotification(notification));
    Notifications.manager.emit(notification.kind, notification);
    Notifications.toast(notification);
  });

  useSocketListener("notifications-update", (update) => {
    dispatch(Notifications.updateLog(update));
  });

  useSocketListener("notifications-delete", (notificationId) => {
    dispatch(Notifications.removeNotification(notificationId));
  });

  return null;
};
