import { GameDocument } from "@core/types/game/GameDocument";
import { Http } from "@client/services/http";

export function getGames(data: {
  category: string;
}): Promise<{
  games: GameDocument[];
}> {
  return Http.post("/games/get-games", data);
}
