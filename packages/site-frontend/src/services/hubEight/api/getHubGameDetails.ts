import { Http } from "@client/services/http";
import { HubEightGameDocument } from "@core/types/hub-eight/HubEightGameDocument";

interface GameLauncherRequest {
  game_code: string;
};

export function getGameDetails(data: GameLauncherRequest): Promise<{game:HubEightGameDocument}> {
  return Http.post("/hub-eight/game/details", data);
}
