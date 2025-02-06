import { PageTitle } from "@client/comps/page/PageTitle";
import { SvgBattle } from "@client/svgs/common/SvgBattle";
import { SitePage } from "#app/comps/site-page/SitePage";
import { IndexHeader } from "./index/IndexHeader";
import { BattleGrid } from "./index/BattleGrid";
import { IndexManager } from "./index/IndexManager";

export function CaseBattleIndexPage() {
  return (
    <SitePage
      className="CaseBattleIndexPage"
      title="Battles"
    >
      <IndexManager />
      <PageTitle
        icon={SvgBattle}
        heading="Battles"
      />
      <IndexHeader />
      <BattleGrid />
    </SitePage>
  );
}
