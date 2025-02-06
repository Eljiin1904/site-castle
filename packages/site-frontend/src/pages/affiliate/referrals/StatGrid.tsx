import { AffiliateStats } from "@core/types/affiliates/AffiliateStats";
import { Div } from "@client/comps/div/Div";
import { Card } from "@client/comps/cards/Card";
import { SvgTeam } from "@client/svgs/common/SvgTeam";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { StatSlide } from "./StatSlide";
import { StatCard } from "./StatCard";

export const StatGrid = ({ stats }: { stats: AffiliateStats | undefined }) => {
  const mainLayout = useAppSelector((x) => x.style.mainLayout);

  return (
    <Div
      fx
      column
    >
      <Div
        fx
        wrap={mainLayout === "mobile"}
        gap={12}
      >
        <Card column>
          <StatSlide
            label="Total Depositors"
            icon={SvgTeam}
            field="count"
            value={stats?.depositorCount}
            position="header"
          />
          <StatSlide
            label="First Time Depositors"
            icon={SvgTeam}
            field="count"
            value={stats?.ftdCount}
          />
          <StatSlide
            label="Active Referrals"
            icon={SvgTeam}
            field="count"
            value={stats?.activeCount}
          />
          <StatSlide
            label="Churned Referrals"
            icon={SvgTeam}
            field="count"
            value={stats?.churnedCount}
          />
        </Card>
        <Div
          fx
          column
          gap={12}
        >
          <StatCard
            label="Total Earned"
            field="tokens"
            value={stats?.commissionAmount}
          />
          <StatCard
            label="Total Referrals"
            icon={SvgTeam}
            field="count"
            value={stats?.referralCount}
          />
        </Div>
        <Card column>
          <StatSlide
            label="Total XP"
            field="intimal"
            value={stats?.referralXp}
            position="header"
          />
          <StatSlide
            label="Total Wagered"
            field="tokens"
            value={stats?.wagerAmount}
          />
          <StatSlide
            label="Total Rewards"
            field="tokens"
            value={stats?.rewardAmount}
          />
          <StatSlide
            label="Total Deposited"
            field="tokens"
            value={stats?.depositAmount}
          />
        </Card>
      </Div>
    </Div>
  );
};
