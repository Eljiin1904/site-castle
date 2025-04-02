import { SitePage } from "#app/comps/site-page/SitePage";
import { MinesContent } from "./MinesContent";
import { MinesManager } from "./MinesManager";

export const MinesPage = () => {
  return (
    <SitePage
      className="MinesPage"
      title="Mines"
    >
      <MinesManager />
      <MinesContent />
    </SitePage>
  );
};
