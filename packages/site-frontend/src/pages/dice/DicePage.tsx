import { GamePage } from "#app/comps/game-page/GamePage";
import { DiceManager } from "./DiceManager";
import { DiceContent } from "./DiceContent";

/**
 * Dice Main Page, contains the DiceManager and DiceContent components
 * DiceManager is the component that manages the dice rolls
 * DiceContent is the component that displays the dice rolls
 * @returns
 */
export const DicePage = () => {
  
  return (
     <GamePage
        className="DicePage"
        title="Dice"
      >
      <DiceManager />
      <DiceContent />
    </GamePage>
  );
};
