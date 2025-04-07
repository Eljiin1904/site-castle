export interface MinesGameState {
  gameId: string;
  betAmount: number;
  gridSize: number;
  mineCount: number;
  mines: number[];
  reveals: number[];
  revealCount: number;
  completed: boolean;
}
