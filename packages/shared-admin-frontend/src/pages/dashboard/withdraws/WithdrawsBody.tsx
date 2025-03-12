import { SiteReport } from "@core/types/site/SiteReport";
import { Div } from "@client/comps/div/Div";
import { WithdrawsTable } from "./WithdrawsTable";

export const WithdrawsBody = ({ report }: { report: SiteReport }) => {
  return (
    <Div
      fx
      column
    >
      <WithdrawsTable report={report} />
    </Div>
  );
};
