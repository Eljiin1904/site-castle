import { SitePage } from "#app/comps/site-page/SitePage";
import { DiceManager } from "./DiceManager";
import { DiceContent } from "./DiceContent";

export const DicePage = () => {
  return (
    <SitePage
      className="DicePage"
      title="Dice"
    >
      <DiceManager />
      <DiceContent />
    </SitePage>
  );
};
