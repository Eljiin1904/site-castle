import { GamePage } from "#app/comps/game-page/GamePage";
import { useTranslation } from "@core/services/internationalization/internationalization";
import { CrashManager } from "./CrashManager";
import { CrashContent } from "./CrashContent";
/**
 * Crash Main Page, contains the CrashManager and CrashContent components
 * CrashManager is the component that manages the crash rounds
 * CrashContent is the component that displays the crash game
 * @returns
 */
export const CrashPage = () => {
  
  const { t } = useTranslation();
  return (
     <GamePage
        className="CrashPage"
        title={t('games.crash')}
      >
      <CrashManager />
      <CrashContent />
    </GamePage>
  );
};
