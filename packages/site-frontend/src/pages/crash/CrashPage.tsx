import { GamePage } from "#app/comps/game-page/GamePage";
import { useTranslation } from "@core/services/internationalization/internationalization";
import { CrashManager } from "./CrashManager";
import { CrashContent } from "./CrashContent";
/**
 * Main component for the Crash game page.
 * 
 * The Crash game is a betting game where players can place bets and cash out based on a multiplier that increases over time.
 * The game has two modes: Manual Mode and Auto Mode.
 * 
 * ### Manual Mode:
 * - Players can place bets during the "waiting for bets" phase of the round.
 * - Players can cash out at any time during the round to secure their winnings.
 * - Players can set a target multiplier to automatically cash out when the multiplier is reached.
 * - Bets for the next round can be placed while the current round is ongoing.
 * - Players can cancel bets for the next round at any time before the round starts.
 * 
 * ### Auto Mode:
 * - Players can set a target multiplier to automatically cash out when the multiplier is reached.
 * - Players can  set a profit limit and a loss limit to stop Auto Mode when these thresholds are met.
 * - Players can define win and loss actions to adjust the bet amount automatically based on the outcome of the round.
 * - Players can set a limit for the number of games to play in Auto Mode.
 * 
 * The Crash game provides an engaging experience with strategic options for both manual and automated gameplay.
 */
export const CrashPage = () => {
  
  const { t } = useTranslation(['games\\crash']);
  return (
     <GamePage
        className="CrashPage"
        title={t('title')}
      >
      <CrashManager />
      <CrashContent />
    </GamePage>
  );
};