import { GamePage } from "#app/comps/game-page/GamePage";
import { MinesContent } from "./MinesContent";
import { MinesManager } from "./MinesManager";

/**
 * Mines Main Page, contains the MinesManager and MineContent components
 * DiceManager is the component that manages the mine games
 * MinesContent is the component that displays the mine games
 * @returns
 */
export const MinesPage = () => {
  
  return (
     <GamePage
        className="MinesPage"
        title="Mines"
      >
      <MinesManager />
      <MinesContent />
    </GamePage>
  );
};
