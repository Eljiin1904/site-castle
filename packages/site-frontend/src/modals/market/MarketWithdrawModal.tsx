import { useState } from "react";
import { MarketItemDocument } from "@core/types/market/MarketItemDocument";
import { Modal } from "@client/comps/modal/Modal";
import { Dialogs } from "@client/services/dialogs";
import { Toasts } from "@client/services/toasts";
import { ModalHeader } from "@client/comps/modal/ModalHeader";
import { ModalBody } from "@client/comps/modal/ModalBody";
import { usePost } from "@client/hooks/system/usePost";
import { Market } from "#app/services/market";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { useNotificationListener } from "#app/hooks/notifications/useNotificationListener";
import { SteamLinkContent } from "./withdraw/SteamLinkContent";
import { TradeUrlContent } from "./withdraw/TradeUrlContent";
import { PriceContent } from "./withdraw/PriceContent";
import { MarketItemCard } from "./comps/MarketItemCard";
import { LoadingContent } from "./withdraw/LoadingContent";
import { FailContent } from "./withdraw/FailContent";
import { CompleteContent } from "./withdraw/CompleteContent";
import { OfferContent } from "./withdraw/OfferContent";
import { waitForAuthenticatorCode } from "../security/AuthenticatorCodeModal";

export const MarketWithdrawModal = ({ item }: { item: MarketItemDocument }) => {
  const [loading, setLoading] = useState(false);
  const [pending, setPending] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [cancelled, setCancelled] = useState(false);
  const [offerId, setOfferId] = useState<string>();

  const steamId = useAppSelector((x) => x.user.steamId);
  const tradeUrl = useAppSelector((x) => x.user.meta.steamTradeUrl);

  const tfaEnabled = useAppSelector((x) => x.user.tfa.enabled);
  const settings = useAppSelector((x) => x.user.settings);
  const require2fa = tfaEnabled && settings.withdraw2fa;

  const handleWithdraw = usePost(
    async () => {
      let tfac: string | undefined;

      if (require2fa) {
        tfac = await waitForAuthenticatorCode();
        if (!tfac) return;
      }

      await Market.createWithdraw({
        itemId: item._id,
        tfac,
      });

      setPending(true);
    },
    (x) => setLoading(x),
    (err) => Toasts.error(err),
  );

  useNotificationListener("skin-withdraw-sent", (x) => {
    setOfferId(x.tradeOfferId);
    setPending(false);
  });

  useNotificationListener("skin-withdraw-confirmed", () => {
    setConfirmed(true);
  });

  useNotificationListener("skin-withdraw-cancelled", () => {
    setCancelled(true);
  });

  let showItem = true;
  let content;

  if (!steamId) {
    showItem = false;
    content = <SteamLinkContent />;
  } else if (!tradeUrl) {
    showItem = false;
    content = <TradeUrlContent />;
  } else if (cancelled) {
    content = <FailContent />;
  } else if (loading || pending) {
    content = <LoadingContent />;
  } else if (confirmed) {
    content = <CompleteContent />;
  } else if (offerId) {
    content = <OfferContent offerId={offerId} />;
  } else {
    content = (
      <PriceContent
        item={item}
        onSelect={handleWithdraw}
      />
    );
  }

  return (
    <Modal
      width="sm"
      fixedHeight="580px"
      disableBackdrop={pending || offerId !== undefined}
      disableMobileFullscreen
      onBackdropClick={() => Dialogs.close("primary")}
    >
      <ModalHeader onCloseClick={() => Dialogs.close("primary")} />
      <ModalBody>
        {showItem && (
          <MarketItemCard
            marketHashName={item.marketHashName}
            slug={item.slug}
            tokenValue={item.tokenValue}
          />
        )}
        {content}
      </ModalBody>
    </Modal>
  );
};
