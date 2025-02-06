import { Fragment } from "react";
import { useQuery } from "@tanstack/react-query";
import { RewardProductDocument } from "@core/types/rewards/RewardProductDocument";
import { PageNotice } from "@client/comps/page/PageNotice";
import { Errors } from "@client/services/errors";
import { Dialogs } from "@client/services/dialogs";
import { Toasts } from "@client/services/toasts";
import { ConfirmModal } from "@client/modals/confirm/ConfirmModal";
import { Rewards } from "#app/services/rewards";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { StoreBanner } from "./StoreBanner";
import { ProductGrid } from "./ProductGrid";

export const StoreBody = () => {
  const gemBalance = useAppSelector((x) => x.user.gemBalance);

  const query = useQuery({
    queryKey: ["reward-products"],
    queryFn: () => Rewards.getProducts(),
  });

  const handleBuy = (x: RewardProductDocument) => {
    if (x.gemCost > gemBalance) {
      Toasts.error(new Error("You do not have enough gems."));
    } else {
      Dialogs.open(
        "secondary",
        <ConfirmModal
          heading={`Buy ${x.displayName}`}
          message={`Are you sure you want to buy ${x.displayName}?`}
          onConfirm={async () => {
            await Rewards.buyProduct({ productId: x._id });
            Toasts.success(`${x.displayName} purchased.`);
          }}
        />,
      );
    }
  };

  if (query.error) {
    return (
      <PageNotice
        image="/graphics/notice-chicken-error"
        title="Error"
        message="Something went wrong, please refetch page."
        buttonLabel="Refetch Page"
        description={Errors.getMessage(query.error)}
        onButtonClick={query.refetch}
      />
    );
  }

  return (
    <Fragment>
      <StoreBanner />
      <ProductGrid
        products={query.data?.products}
        onBuyClick={handleBuy}
      />
    </Fragment>
  );
};
