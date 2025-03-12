import { SiteReport } from "@core/types/site/SiteReport";
import { Div } from "@client/comps/div/Div";
import { AccountTable } from "./AccountTable";
import { ProfitTable } from "./ProfitTable";

export const ProfitBody = ({ report }: { report: SiteReport }) => {
  return (
    <Div
      fx
      column
      gap={24}
    >
      <AccountTable report={report} />
      <ProfitTable report={report} />
    </Div>
  );
};
