import { SiteReport } from "@core/types/site/SiteReport";
import { Span } from "@client/comps/span/Span";
import { Intimal } from "@core/services/intimal";
import { DataTable } from "../DataTable";
import { getAccountData } from "./getAccountData";

export const AccountTable = ({ report }: { report: SiteReport }) => {
  return (
    <DataTable
      data={getAccountData(report)}
      columns={[
        {
          heading: "Account Type",
          grow: 4,
          justify: "flex-start",
          rowRenderer: (x) => <Span>{x.label}</Span>,
        },
        {
          heading: "Tokens IN",
          grow: 3,
          justify: "flex-end",
          rowRenderer: (x) => <Span>{Intimal.toLocaleString(x.tokensIn)}</Span>,
        },
        {
          heading: "Tokens OUT",
          grow: 3,
          justify: "flex-end",
          rowRenderer: (x) => (
            <Span>{Intimal.toLocaleString(x.tokensOut)}</Span>
          ),
        },
        {
          heading: "Profit",
          grow: 3,
          justify: "flex-end",
          rowRenderer: (x) => <Span>{Intimal.toLocaleString(x.profit)}</Span>,
        },
      ]}
    />
  );
};
