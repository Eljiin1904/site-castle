import { SitePage } from "#app/comps/site-page/SitePage";
import { DiceManager } from "./DiceManager";
import { DiceContent } from "./DiceContent";
import { useAppSelector } from "#app/hooks/store/useAppSelector";

export const DicePage = () => {
  
  const layout = useAppSelector((x) => x.style.mainLayout);
  const small = layout === "mobile";
  const tablet = layout === "tablet";
  return (
    <SitePage
      className="DicePage"
      title="Dice"
      px={small ? 0 : (tablet ? 24: 40)}
    >
      <DiceManager />
      <DiceContent />
    </SitePage>
  );
};
