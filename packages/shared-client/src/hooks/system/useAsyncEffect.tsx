import { DependencyList, useEffect, useLayoutEffect, useRef } from "react";
import { Toasts } from "#client/services/toasts";

export function useAsyncEffect(
  callback: () => void | Promise<void>,
  deps: DependencyList,
  onError?: (x: unknown) => void,
) {
  const savedCallback = useRef(callback);
  const mounted = useRef(true);

  useLayoutEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  useEffect(() => {
    const handler = async () => {
      try {
        await savedCallback.current();
      } catch (err) {
        if (mounted.current) {
          if (onError) {
            onError(err);
          } else {
            Toasts.error(err);
          }
        }
      }
    };
    handler();
  }, deps);

  return null;
}
