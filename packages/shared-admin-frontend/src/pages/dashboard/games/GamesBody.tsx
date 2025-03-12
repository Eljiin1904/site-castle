import { SiteReport } from "@core/types/site/SiteReport";
import { Div } from "@client/comps/div/Div";
import { GamesTable } from "./GamesTable";
import { BonusesTable } from "./BonusesTable";

export const GamesBody = ({ report }: { report: SiteReport }) => {
  return (
    <Div
      fx
      column
      gap={24}
    >
      <GamesTable report={report} />
      <BonusesTable report={report} />
    </Div>
  );
};
