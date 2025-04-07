import { MinesGameState } from "#core/types/mines/MinesGameState";
import { Http } from "#client/services/http";

export function createAutoGame(data: {
  betAmount: number;
  gridSize: number;
  mineCount: number;
  tileIndexes: number[];
  betToken?: string;
}): Promise<{
  state: MinesGameState;
}> {
  return Http.post("/mines/create-auto-game", data);
}
