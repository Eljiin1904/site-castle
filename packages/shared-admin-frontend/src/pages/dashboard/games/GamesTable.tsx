import { SiteReport } from "@core/types/site/SiteReport";
import { Intimal } from "@core/services/intimal";
import { Numbers } from "@core/services/numbers";
import { Span } from "@client/comps/span/Span";
import { DataTable } from "../DataTable";
import { getGamesData } from "./getGamesData";

export const GamesTable = ({ report }: { report: SiteReport }) => {
  return (
    <DataTable
      data={getGamesData(report)}
      columns={[
        {
          heading: "Game",
          grow: 4,
          justify: "flex-start",
          rowRenderer: (x) => <Span>{x.label}</Span>,
        },
        {
          heading: "Wagered",
          grow: 3,
          justify: "flex-end",
          rowRenderer: (x) => <Span>{Intimal.toLocaleString(x.wager)}</Span>,
        },
        {
          heading: "Won",
          grow: 3,
          justify: "flex-end",
          rowRenderer: (x) => <Span>{Intimal.toLocaleString(x.won)}</Span>,
        },
        {
          heading: "GGR",
          grow: 3,
          justify: "flex-end",
          rowRenderer: (x) => (
            <Span>{Intimal.toLocaleString(x.wager - x.won)}</Span>
          ),
        },
        {
          heading: "GGR %",
          grow: 3,
          justify: "flex-end",
          rowRenderer: (x) => (
            <Span>{Numbers.toPercentString((x.wager - x.won) / x.wager)}</Span>
          ),
        },
        {
          heading: "EV",
          grow: 3,
          justify: "flex-end",
          rowRenderer: (x) => <Span>{Intimal.toLocaleString(x.ev)}</Span>,
        },
        {
          heading: "Bets",
          grow: 3,
          justify: "flex-end",
          rowRenderer: (x) => <Span>{x.count.toLocaleString()}</Span>,
        },
        {
          heading: "Avg Bet",
          grow: 3,
          justify: "flex-end",
          rowRenderer: (x) => (
            <Span>{Intimal.toLocaleString(x.wager / x.count)}</Span>
          ),
        },
      ]}
    />
  );
};
