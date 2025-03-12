import { useEffect, useLayoutEffect, useRef } from "react";
import { AdminServerEvents } from "@core/types/sockets/AdminServerEvents";
import { Sockets } from "#app/services/sockets";

export function useSocketListener<K extends keyof AdminServerEvents>(
  key: K,
  callback: (...args: Parameters<AdminServerEvents[K]>) => void | Promise<void>,
) {
  const savedCallback = useRef(callback);

  useLayoutEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const onEvent = (...args: any[]) => {
      savedCallback.current(...(args as Parameters<AdminServerEvents[K]>));
    };

    Sockets.client.on<keyof AdminServerEvents>(key, onEvent);

    return () => {
      Sockets.client.off<keyof AdminServerEvents>(key, onEvent);
    };
  });
}
