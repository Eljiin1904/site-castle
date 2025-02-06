import { Fragment } from "react";
import { PageTitle } from "@client/comps/page/PageTitle";
import { SvgRank } from "@client/svgs/common/SvgRank";
import { Div } from "@client/comps/div/Div";
import { Button } from "@client/comps/button/Button";
import { Dialogs } from "@client/services/dialogs";
import { NoticeCard } from "@client/comps/cards/NoticeCard";
import { AffiliateTiersModal } from "#app/modals/affiliate/AffiliateTiersModal";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { TierCards } from "./TierCards";

export const TierSection = () => {
  const baseTier = useAppSelector((x) => x.user.affiliate.baseTier);

  return (
    <Fragment>
      <Div justify="space-between">
        <PageTitle
          icon={SvgRank}
          heading="Affiliate Tier"
          fx={undefined}
        />
        <Button
          kind="primary"
          label="View All Tiers"
          onClick={() => Dialogs.open("primary", <AffiliateTiersModal />)}
        />
      </Div>
      {baseTier && (
        <NoticeCard
          kind="info"
          message={`You have been assigned tier ${baseTier} as your base, or minimum, tier.`}
        />
      )}
      <TierCards />
    </Fragment>
  );
};
