import { SiteReport } from "@core/types/site/SiteReport";
import { SvgUser } from "@client/svgs/common/SvgUser";
import { Numbers } from "@core/services/numbers";
import { OverviewSlide } from "./OverviewSlide";
import { OverviewCard } from "./OverviewCard";

export const RetentionCard = ({ report }: { report: SiteReport }) => {
  const users = report.users;

  return (
    <OverviewCard
      icon={SvgUser}
      heading="User Retention"
    >
      <OverviewSlide
        label="Total Churned Users"
        value={users.totalChurnedUsers.toLocaleString()}
      />
      <OverviewSlide
        label="% of Total Users"
        value={Numbers.toPercentString(
          users.totalChurnedUsers / users.totalUsers,
        )}
        color="light-blue"
      />
      <OverviewSlide
        label="Churned Users"
        value={users.churnedUsers.toLocaleString()}
      />
      <OverviewSlide
        label="Re-activated Users"
        value={users.reactivatedUsers.toLocaleString()}
      />
      <OverviewSlide
        label="Active Players"
        value={users.activePlayers.toLocaleString()}
      />
      <OverviewSlide
        label="% have Deposited"
        value={Numbers.toPercentString(
          users.activeDepositPlayers / users.activePlayers,
        )}
        color="light-blue"
      />
    </OverviewCard>
  );
};
