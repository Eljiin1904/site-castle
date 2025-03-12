import { SiteReport } from "@core/types/site/SiteReport";
import { Span } from "@client/comps/span/Span";
import { Intimal } from "@core/services/intimal";
import { Numbers } from "@core/services/numbers";
import { DataTable } from "../DataTable";
import { getWithdrawData } from "./getWithdrawData";

export const WithdrawsTable = ({ report }: { report: SiteReport }) => {
  return (
    <DataTable
      data={getWithdrawData(report)}
      columns={[
        {
          heading: "Method",
          grow: 4,
          justify: "flex-start",
          rowRenderer: (x) => <Span>{x.label}</Span>,
        },
        {
          heading: "Tokens",
          grow: 3,
          justify: "flex-end",
          rowRenderer: (x) => <Span>{Intimal.toLocaleString(x.tokens)}</Span>,
        },
        {
          heading: "USD",
          grow: 3,
          justify: "flex-end",
          rowRenderer: (x) => (
            <Span>{Numbers.toUsdString(Intimal.toDecimal(x.tokens / 2))}</Span>
          ),
        },
        {
          heading: "Crypto",
          grow: 3,
          justify: "flex-end",
          rowRenderer: (x) => (
            <Span>
              {x.crypto === undefined
                ? "-"
                : Numbers.toLocaleString(x.crypto, 8)}
            </Span>
          ),
        },
        {
          heading: "Count",
          grow: 3,
          justify: "flex-end",
          rowRenderer: (x) => <Span>{x.count.toLocaleString()}</Span>,
        },
        {
          heading: "Average TX",
          grow: 3,
          justify: "flex-end",
          rowRenderer: (x) => (
            <Span>{Intimal.toLocaleString(x.avgTokens)}</Span>
          ),
        },
      ]}
    />
  );
};
