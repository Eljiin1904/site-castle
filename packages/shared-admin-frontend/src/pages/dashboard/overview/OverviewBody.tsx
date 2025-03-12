import { SiteReport } from "@core/types/site/SiteReport";
import { Div } from "@client/comps/div/Div";
import { BalanceCard } from "./BalanceCard";
import { SignUpsCard } from "./SignUpsCard";
import { DepositsCard } from "./DepositsCard";
import { RetentionCard } from "./RetentionCard";
import { WithdrawsCard } from "./WithdrawsCard";

export const OverviewBody = ({ report }: { report: SiteReport }) => {
  return (
    <Div
      fx
      gap={16}
    >
      <Div
        fx
        column
        gap={16}
      >
        <SignUpsCard report={report} />
        <BalanceCard report={report} />
      </Div>
      <Div
        fx
        column
        gap={16}
      >
        <RetentionCard report={report} />
        <DepositsCard report={report} />
      </Div>
      <Div
        fx
        column
        gap={16}
      >
        <WithdrawsCard report={report} />
      </Div>
    </Div>
  );
};
