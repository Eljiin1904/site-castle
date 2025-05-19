import { SitePage } from "#app/comps/site-page/SitePage";
import { BlackjackHeader } from "./BlackjackHeader";
import { BlackjackManager } from "./BlackjackManager";
import { BlackjackView } from "./BlackjackView";
import { BlackjackFeed } from "./BlackjackFeed";
import { useTranslation } from "#client/hooks/localization/useTranslation";

export const BlackjackPage = () => {
  const { t } = useTranslation();
  return (
    <SitePage
      className="BlackjackPage"
      title={t.games("blackjack")}
    >
      <BlackjackManager />
      <BlackjackHeader />
      <BlackjackView />
      <BlackjackFeed />
    </SitePage>
  );
};
