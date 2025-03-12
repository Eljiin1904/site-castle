import { useEffect } from "react";
import { Toasts } from "#client/services/toasts";

export function useErrorToast(error: Error | undefined | null) {
  useEffect(() => {
    if (error) {
      Toasts.error(error);
    }
  }, [error]);
}
