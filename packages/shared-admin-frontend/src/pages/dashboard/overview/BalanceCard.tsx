import { SiteReport } from "@core/types/site/SiteReport";
import { Intimal } from "@core/services/intimal";
import { Rewards } from "@core/services/rewards";
import { SvgCoinStack } from "@client/svgs/common/SvgCoinStack";
import { OverviewSlide } from "./OverviewSlide";
import { OverviewCard } from "./OverviewCard";

export const BalanceCard = ({ report }: { report: SiteReport }) => {
  const users = report.users;

  const totalOwed =
    users.tokenBalances +
    users.vaultBalances +
    users.gemBalances * Rewards.gemToTokenRate +
    users.levelCaseBalances +
    users.commissionBalances;

  return (
    <OverviewCard
      icon={SvgCoinStack}
      heading="User Balances"
    >
      <OverviewSlide
        label="Token Balances"
        value={Intimal.toLocaleString(users.tokenBalances)}
      />
      <OverviewSlide
        label="Vault Balances"
        value={Intimal.toLocaleString(users.vaultBalances)}
      />
      <OverviewSlide
        label="Gems Value"
        value={Intimal.toLocaleString(
          users.gemBalances * Rewards.gemToTokenRate,
        )}
      />
      <OverviewSlide
        label="Level Case Keys Value"
        value={Intimal.toLocaleString(users.levelCaseBalances)}
      />
      <OverviewSlide
        label="Unclaimed Commission"
        value={Intimal.toLocaleString(users.commissionBalances)}
      />
      <OverviewSlide
        label="Holiday Balances"
        value={Intimal.toLocaleString(users.holidayBalances)}
      />
      <OverviewSlide
        label="Total Owed"
        value={Intimal.toLocaleString(totalOwed)}
        color="light-orange"
      />
    </OverviewCard>
  );
};
