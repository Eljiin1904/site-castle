import { MinesGameState } from "@core/types/mines/MinesGameState";
import { Http } from "@client/services/http";

export function cashout(): Promise<{ state: MinesGameState }> {
  return Http.post("/mines/cashout");
}
