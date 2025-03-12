import { SitePage } from "#app/comps/site-page/SitePage";
import { ScriptMenu } from "./ScriptMenu";

export const DevPage = () => {
  return (
    <SitePage
      className="DevPage"
      title="Developers"
    >
      <ScriptMenu />
    </SitePage>
  );
};
