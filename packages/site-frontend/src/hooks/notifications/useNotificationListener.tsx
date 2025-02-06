import { Notifications } from "#app/services/notifications";
import { NotificationDocument } from "@core/types/notifications/NotificationDocument";
import { NotificationKind } from "@core/types/notifications/NotificationKind";
import { useEffect, useLayoutEffect, useRef } from "react";

export function useNotificationListener<K extends NotificationKind>(
  key: K,
  callback: (x: NotificationDocument & { kind: K }) => void,
) {
  const savedCallback = useRef(callback);

  useLayoutEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const onEvent = (x: NotificationDocument & { kind: K }) => {
      savedCallback.current(x);
    };
    Notifications.manager.on<K>(key, onEvent);
    return () => {
      Notifications.manager.off<K>(key, onEvent);
    };
  });
}
