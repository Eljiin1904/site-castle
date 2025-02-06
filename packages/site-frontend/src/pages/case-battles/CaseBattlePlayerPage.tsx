import { SitePage } from "#app/comps/site-page/SitePage";
import { BattleManager } from "./battle/BattleManager";
import { BattleContent } from "./battle/BattleContent";

export function CaseBattlePlayerPage() {
  return (
    <SitePage
      className="CaseBattlePlayerPage"
      title="Battles"
    >
      <BattleManager />
      <BattleContent />
    </SitePage>
  );
}
