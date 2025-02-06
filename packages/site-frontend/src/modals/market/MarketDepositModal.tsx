import { useState } from "react";
import { MarketInventoryItem } from "@core/types/market/MarketInventoryDocument";
import { MarketPrice } from "@core/types/market/MarketPrice";
import { Modal } from "@client/comps/modal/Modal";
import { Dialogs } from "@client/services/dialogs";
import { ModalBody } from "@client/comps/modal/ModalBody";
import { usePost } from "@client/hooks/system/usePost";
import { ModalHeader } from "@client/comps/modal/ModalHeader";
import { Market } from "#app/services/market";
import { useNotificationListener } from "#app/hooks/notifications/useNotificationListener";
import { OfferContent } from "./deposit/OfferContent";
import { PriceContent } from "./deposit/PriceContent";
import { LoadingContent } from "./deposit/LoadingContent";
import { CompleteContent } from "./deposit/CompleteContent";
import { FailContent } from "./deposit/FailContent";
import { MarketItemCard } from "./comps/MarketItemCard";

export const MarketDepositModal = ({
  inventoryId,
  item,
}: {
  inventoryId: string;
  item: MarketInventoryItem;
}) => {
  const [loading, setLoading] = useState(false);
  const [pending, setPending] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [cancelled, setCancelled] = useState(false);
  const [price, setPrice] = useState<MarketPrice>();
  const [offerId, setOfferId] = useState<string>();

  const handleOffer = usePost(async (_, price: MarketPrice) => {
    const res = await Market.createDeposit({
      inventoryId,
      assetId: item.assetId,
      provider: price.provider,
    });

    setPrice(price);

    if (res.tradeOfferId) {
      setOfferId(res.tradeOfferId);
    } else {
      setPending(true);
    }
  }, setLoading);

  useNotificationListener("skin-deposit-sent", (x) => {
    setOfferId(x.tradeOfferId);
    setPending(false);
  });

  useNotificationListener("skin-deposit-confirmed", () => {
    setConfirmed(true);
  });

  useNotificationListener("skin-deposit-cancelled", () => {
    setCancelled(true);
  });

  let content;

  if (cancelled) {
    content = <FailContent />;
  } else if (loading || pending) {
    content = <LoadingContent />;
  } else if (confirmed) {
    content = <CompleteContent />;
  } else if (price && offerId) {
    content = <OfferContent offerId={offerId} />;
  } else {
    content = (
      <PriceContent
        item={item}
        onSelect={handleOffer}
      />
    );
  }

  return (
    <Modal
      width="sm"
      fixedHeight="580px"
      disableBackdrop={offerId !== undefined}
      onBackdropClick={() => Dialogs.close("primary")}
    >
      <ModalHeader onCloseClick={() => Dialogs.close("primary")} />
      <ModalBody>
        <MarketItemCard
          marketHashName={item.marketHashName}
          slug={item.slug}
          tokenValue={item.bestPrice}
        />
        {content}
      </ModalBody>
    </Modal>
  );
};
