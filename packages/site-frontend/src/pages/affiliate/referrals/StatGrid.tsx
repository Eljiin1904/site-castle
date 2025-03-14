import { AffiliateStats } from "@core/types/affiliates/AffiliateStats";
import { Div } from "@client/comps/div/Div";
import { StatCard } from "./StatCard";
import { SvgTotalReferrals } from "#app/svgs/referrals/SvgTotalReferrals";
import { SvgTotalEarnings } from "#app/svgs/referrals/SvgTotalEarnings";
import { Button } from "@client/comps/button/Button";
import { Dialogs } from "@client/services/dialogs";
import { AffiliateReloadModal } from "#app/modals/affiliate/AffiliateReloadModal";
import { useIsMobileLayout } from "#app/hooks/style/useIsMobileLayout";

export const StatGrid = ({ stats }: { stats: AffiliateStats | undefined }) => {
  const small = useIsMobileLayout();
  return (
    <Div
      fx
      column
    >
      <Div
        fx
        wrap={small}
        gap={small ? 16: 24}
      >
        <StatCard
          label="Claimable Earnings"
          field="tokens"
          value={stats?.activeCount}
          special={true}
          button={<Button kind="primary-black" label="Claim" size="lg"  onClick={() => Dialogs.open("primary", <AffiliateReloadModal/>)}></Button>}
        />
        <Div
          fx
          column
          gap={small ? 8 : 12}
        >
          <StatCard
            label="Your Total Earnings"
            icon={SvgTotalEarnings}
            field="tokens"
            value={stats?.commissionAmount}
          />
        </Div>
        <StatCard
          label="Total Referrals"
          icon={SvgTotalReferrals}
          field="count"
          value={stats?.referralCount}
        />
      </Div>
    </Div>
  );
};
