import { usePost } from "@client/hooks/system/usePost";
import { Notifications } from "#app/services/notifications";
import { useAppDispatch } from "#app/hooks/store/useAppDispatch";

export function useDelete() {
  const dispatch = useAppDispatch();

  const handleDelete = usePost(async (_, notificationId: string) => {
    dispatch(Notifications.removeNotification(notificationId));
    await Notifications.deleteNotification({ notificationId });
  });

  return handleDelete;
}
