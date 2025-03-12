import { SiteReport } from "@core/types/site/SiteReport";
import { SvgDeposit } from "@client/svgs/common/SvgDeposit";
import { Numbers } from "@core/services/numbers";
import { OverviewSlide } from "./OverviewSlide";
import { OverviewCard } from "./OverviewCard";

export const DepositsCard = ({ report }: { report: SiteReport }) => {
  const users = report.users;

  return (
    <OverviewCard
      icon={SvgDeposit}
      heading="Deposits"
    >
      <OverviewSlide
        label="Total Depositors"
        value={users.totalDepositors.toLocaleString()}
      />
      <OverviewSlide
        label="% of Total Users"
        value={Numbers.toPercentString(
          users.totalDepositors / users.totalUsers,
        )}
        color="light-blue"
      />
      <OverviewSlide
        label="Depositors"
        value={users.recentDepositors.toLocaleString()}
      />
      <OverviewSlide
        label="First Time Depositors"
        value={users.newDepositors.toLocaleString()}
      />
      <OverviewSlide
        label="% of New Users"
        value={Numbers.toPercentString(users.newDepositors / users.newUsers)}
        color="light-blue"
      />
    </OverviewCard>
  );
};
