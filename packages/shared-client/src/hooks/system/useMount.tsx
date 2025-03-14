import { useEffect, useRef } from "react";
import { Toasts } from "#client/services/toasts";
import { useTranslation } from "@core/services/internationalization/internationalization";

export function useMount(
  func: () => void | Promise<void>,
  onError?: (err: unknown) => void,
) {
  const mounted = useRef(true);
  const called = useRef(false);
  const {t} = useTranslation(["validations"]);

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
      } catch (err:any) {
        console.log('use Mount',err);
        err.message = t(err.message,{value: err.cause});
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
