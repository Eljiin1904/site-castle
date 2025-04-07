import { MinesGameState } from "#core/types/mines/MinesGameState";
import { Http } from "#client/services/http";

export function revealTile(data: { revealIndex: number }): Promise<{
  state: MinesGameState;
}> {
  return Http.post("/mines/reveal-tile", data);
}
