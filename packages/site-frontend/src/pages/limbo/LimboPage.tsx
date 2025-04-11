import { GamePage } from "#app/comps/game-page/GamePage";
import { LimboContent } from "./LimboContent";
import { LimboManager } from "./LimboManager";

export const LimboPage = () => {
  return (
    <GamePage
        className="LimboPage"
        title="Limbo"
      >
      <LimboManager />
      <LimboContent />
    </GamePage>
  );
};