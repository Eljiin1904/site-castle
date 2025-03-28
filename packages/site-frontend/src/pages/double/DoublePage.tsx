import { GamePage } from "#app/comps/game-page/GamePage";
import { DoubleManager } from "./DoubleManager";
import { DoubleContent } from "./DoubleContent";

/**
 * Double Main Page, contains the DoubleManager and DoubleContent components
 * DoubleManager is the component that manages the double rolls
 * DoubleContent is the component that displays the double rolls
 * @returns 
 */
export const DoublePage = () => {

  return (
    <GamePage
      className="DoublePage"
      title="Double"
    >
      <DoubleManager />
      <DoubleContent />
    </GamePage>
  );
};