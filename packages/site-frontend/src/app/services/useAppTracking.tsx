import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import TagManager from "react-gtm-module";
import { useMount } from "@client/hooks/system/useMount";
import { useNotificationListener } from "#app/hooks/notifications/useNotificationListener";
import { Gtm } from "#app/services/gtm";
import { store } from "#app/store";
import config from "#app/config";

export function useAppTracking() {
  const location = useLocation();

  useMount(() => {
    TagManager.initialize({ gtmId: config.gtmId });
  });

  useEffect(() => {
    const { user, site } = store.getState();

    Gtm.push({
      event: "pageview",
      pagePath: location.pathname + location.search,
      pageTitle: site.title,
      authenticated: user.authenticated,
      userId: user._id,
    });
  }, [location]);

  useNotificationListener("crypto-deposit-confirmed", (x) => {
    Gtm.trackDeposit({
      transactionId: x.transactionId,
      tokenAmount: x.tokenAmount,
      ftd: x.ftd,
    });
  });

  useNotificationListener("crypto-withdraw-sent", (x) => {
    Gtm.trackWithdraw({
      transactionId: x.transactionId,
      tokenAmount: x.tokenAmount,
    });
  });

  useNotificationListener("skin-deposit-confirmed", (x) => {
    Gtm.trackDeposit({
      transactionId: x.transactionId,
      tokenAmount: x.tokenAmount,
      ftd: x.ftd,
    });
  });

  return null;
}
