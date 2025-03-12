import { SiteReport } from "@core/types/site/SiteReport";
import { Intimal } from "@core/services/intimal";
import { Span } from "@client/comps/span/Span";
import { DataTable } from "../DataTable";
import { getBonusData } from "./getBonusData";

export const BonusesTable = ({ report }: { report: SiteReport }) => {
  return (
    <DataTable
      data={getBonusData(report)}
      columns={[
        {
          heading: "Source",
          grow: 4,
          justify: "flex-start",
          rowRenderer: (x) => <Span>{x.label}</Span>,
        },
        {
          heading: "NEV",
          grow: 3,
          justify: "flex-end",
          rowRenderer: (x) => (
            <Span>
              {x.nev === undefined ? "-" : Intimal.toLocaleString(x.nev)}
            </Span>
          ),
        },
        {
          heading: "NGR",
          grow: 3,
          justify: "flex-end",
          rowRenderer: (x) => (
            <Span>
              {x.ngr === undefined ? "-" : Intimal.toLocaleString(x.ngr)}
            </Span>
          ),
        },
      ]}
    />
  );
};
