import { useEffect, useRef } from "react";
import { Toasts } from "#client/services/toasts";

export function useMount(
  func: () => void | Promise<void>,
  onError?: (err: unknown) => void,
) {
  const mounted = useRef(true);
  const called = useRef(false);

  useEffect(() => {
    mounted.current = true;

    return () => {
      mounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (called.current) {
      return;
    }

    called.current = true;

    const handler = async () => {
      try {
        await func();
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
  });

  return null;
}
