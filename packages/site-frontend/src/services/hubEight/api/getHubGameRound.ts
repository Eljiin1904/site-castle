import { Http } from "@client/services/http";

type Platform = "GPL_DESKTOP" | "GPL_MOBILE";

interface GameRoundRequest {
  transaction_uuid?: string;
  round: string;
}

interface GameRoundResponse {
  url: string;
}

export function getGameRound(data: GameRoundRequest): Promise<GameRoundResponse[]> {
  return Http.post("/hub-eight/game/round/details", data);
}
