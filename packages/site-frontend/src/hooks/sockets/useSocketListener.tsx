import { useEffect, useLayoutEffect, useRef } from "react";
import { SiteServerEvents } from "@core/types/sockets/SiteServerEvents";
import { Sockets } from "#app/services/sockets";

export function useSocketListener<K extends keyof SiteServerEvents>(
  key: K,
  callback: (...args: Parameters<SiteServerEvents[K]>) => void | Promise<void>,
) {
  const savedCallback = useRef(callback);

  useLayoutEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const onEvent = (...args: any[]) => {
      savedCallback.current(...(args as Parameters<SiteServerEvents[K]>));
    };

    Sockets.client.on<keyof SiteServerEvents>(key, onEvent);

    return () => {
      Sockets.client.off<keyof SiteServerEvents>(key, onEvent);
    };
  });
}
