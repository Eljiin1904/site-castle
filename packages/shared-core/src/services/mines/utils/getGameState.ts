import { MinesGameDocument } from "#core/types/mines/MinesGameDocument";
import { MinesGameState } from "#core/types/mines/MinesGameState";

export function getGameState(game: MinesGameDocument): MinesGameState {
  return {
    gameId: game._id,
    betAmount: game.betAmount,
    gridSize: game.gridSize,
    mineCount: game.mineCount,
    mines: game.completed ? game.mines : [],
    reveals: game.reveals,
    revealCount: game.revealCount,
    completed: game.completed || false,
  };
}
