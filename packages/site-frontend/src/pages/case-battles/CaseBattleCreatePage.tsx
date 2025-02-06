import { SitePage } from "#app/comps/site-page/SitePage";
import { CaseSection } from "./create/CaseSection";
import { ModeSection } from "./create/ModeSection";
import { CreateHeader } from "./create/CreateHeader";
import { ModifierSection } from "./create/ModifierSection";
import { CreateFooter } from "./create/CreateFooter";
import { CreateManager } from "./create/CreateManager";

export const CaseBattleCreatePage = () => {
  return (
    <SitePage
      className="CaseBattleCreatePage"
      title="Battles"
      privileged
      gap={24}
    >
      <CreateManager />
      <CreateHeader />
      <ModeSection />
      <CaseSection />
      <ModifierSection />
      <CreateFooter />
    </SitePage>
  );
};
