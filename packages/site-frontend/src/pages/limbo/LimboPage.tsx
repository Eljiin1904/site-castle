import { SitePage } from "#app/comps/site-page/SitePage";
import { LimboContent } from "./LimboContent";
import { LimboManager } from "./LimboManager";

export const LimboPage = () => {
  return (
    <SitePage
      className="LimboPage"
      title="Limbo"
    >
      <LimboManager />
      <LimboContent />
    </SitePage>
  );
};
