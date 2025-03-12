import { SiteReport } from "@core/types/site/SiteReport";
import { SvgWithdraw } from "@client/svgs/common/SvgWithdraw";
import { Numbers } from "@core/services/numbers";
import { OverviewSlide } from "./OverviewSlide";
import { OverviewCard } from "./OverviewCard";
import { Intimal } from "@core/services/intimal";

export const WithdrawsCard = ({ report }: { report: SiteReport }) => {
  const users = report.users;
  const txs = report.transactions;

  return (
    <OverviewCard
      icon={SvgWithdraw}
      heading="Withdraws"
    >
      <OverviewSlide
        label="Total Withdrawers"
        value={users.totalWithdrawers.toLocaleString()}
      />
      <OverviewSlide
        label="% of Total Users"
        value={Numbers.toPercentString(
          users.totalWithdrawers / users.totalUsers,
        )}
        color="light-blue"
      />
      <OverviewSlide
        label="Withdrawers"
        value={users.newWithdrawers.toLocaleString()}
      />
      <OverviewSlide
        label="First Time Withdrawers"
        value={users.newWithdrawers.toLocaleString()}
      />
      <OverviewSlide
        label="% of New Users"
        value={Numbers.toPercentString(users.newWithdrawers / users.newUsers)}
        color="light-blue"
      />
      <OverviewSlide
        label="F2P Withdrawers"
        value={users.f2pWithdrawers.toLocaleString()}
      />
      <OverviewSlide
        label="F2P Withdraw Amount"
        value={Intimal.toLocaleString(txs.f2pWithdrawTokens)}
      />
      <OverviewSlide
        label="% of Withdraws"
        value={Numbers.toPercentString(
          txs.f2pWithdrawTokens / txs.withdrawUserTokens,
        )}
        color="light-blue"
      />
      <OverviewSlide
        label="Churned Withdrawers"
        value={users.churnedWithdrawers.toLocaleString()}
      />
      <OverviewSlide
        label="Churned Withdraw Amount"
        value={Intimal.toLocaleString(txs.churnedWithdrawTokens)}
      />
      <OverviewSlide
        label="% of Withdraws"
        value={Numbers.toPercentString(
          txs.churnedWithdrawTokens / txs.withdrawUserTokens,
        )}
        color="light-blue"
      />
    </OverviewCard>
  );
};
