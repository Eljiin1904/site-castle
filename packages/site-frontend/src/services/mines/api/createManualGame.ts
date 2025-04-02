import { MinesGameState } from "#core/types/mines/MinesGameState";
import { Http } from "#client/services/http";

export function createManualGame(data: {
  betAmount: number;
  gridSize: number;
  mineCount: number;
  betToken?: string;
}): Promise<{
  state: MinesGameState;
}> {
  return Http.post("/mines/create-manual-game", data);
}
