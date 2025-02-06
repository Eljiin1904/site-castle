import { useEventCallback } from "usehooks-ts";
import { Toasts } from "@client/services/toasts";
import config from "#app/config";
import { store } from "#app/store";

export function useShare() {
  const handleShare = useEventCallback(() => {
    const {
      battlePlayer: { _id: battleId },
    } = store.getState();

    navigator.clipboard.writeText(`${config.siteURL}/case-battles/${battleId}`);
    Toasts.success("Link copied to clipboard.");
  });

  return handleShare;
}
