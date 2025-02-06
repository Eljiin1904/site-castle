import { SitePage } from "#app/comps/site-page/SitePage";
import { DoubleManager } from "./DoubleManager";
import { DoubleContent } from "./DoubleContent";

export const DoublePage = () => {
  return (
    <SitePage
      className="DoublePage"
      title="Double"
    >
      <DoubleManager />
      <DoubleContent />
    </SitePage>
  );
};
