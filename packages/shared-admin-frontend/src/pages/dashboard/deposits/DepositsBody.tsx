import { SiteReport } from "@core/types/site/SiteReport";
import { Div } from "@client/comps/div/Div";
import { DepositsTable } from "./DepositsTable";

export const DepositsBody = ({ report }: { report: SiteReport }) => {
  return (
    <Div
      fx
      column
    >
      <DepositsTable report={report} />
    </Div>
  );
};
