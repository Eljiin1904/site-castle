import { SitePage } from "#app/comps/site-page/SitePage";
import { DoubleManager } from "./DoubleManager";
import { DoubleContent } from "./DoubleContent";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { Style } from "@client/services/style";

export const DoublePage = () => {
  
  const layout = useAppSelector((x) => x.style.mainLayout);
  const small = layout === "mobile";
  const tablet = layout === "tablet";

  return (
    <SitePage
      className="DoublePage"
      title="Double"
      px={small ? 0 : (tablet ? 24: 40)}
      pt={Style.responsive(layout, [0, 24, 40, 40])}
    >
      <DoubleManager />
      <DoubleContent />
    </SitePage>
  );
};
