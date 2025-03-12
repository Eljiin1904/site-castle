import { useIsMounted } from "usehooks-ts";
import { Toasts } from "#client/services/toasts";

export function usePost<T extends any[]>(
  func: (isMounted: () => boolean, ...args: T) => Promise<any>,
  setLoading?: (x: boolean) => void,
  onError?: (x: unknown) => void,
): (...args: T) => Promise<void> {
  const isMounted = useIsMounted();

  const handler = async (...args: T) => {
    try {
      setLoading && setLoading(true);
      await func(isMounted, ...args);
    } catch (err) {
      if (isMounted() && onError) {
        onError(err);
      } else {
        Toasts.error(err);
      }
    } finally {
      if (isMounted() && setLoading) {
        setLoading(false);
      }
    }
  };

  return handler;
}
