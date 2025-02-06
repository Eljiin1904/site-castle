import { useState } from "react";
import { Toasts } from "@client/services/toasts";
import { usePost } from "@client/hooks/system/usePost";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { Market } from "#app/services/market";

export function useTradeUrl() {
  const tradeUrl = useAppSelector((x) => x.user.meta.steamTradeUrl);
  const [tempUrl, setTempUrl] = useState(tradeUrl);
  const [loading, setLoading] = useState(false);

  const handleSave = usePost(async () => {
    if (!tempUrl) {
      return;
    }

    if (!Market.tradeUrlRegex.test(tempUrl)) {
      throw new Error("Invalid format.");
    }

    await Market.setTradeUrl({ tradeUrl: tempUrl });

    Toasts.success("Trade URL saved.");
  }, setLoading);

  return { tradeUrl, tempUrl, setTempUrl, loading, handleSave };
}
