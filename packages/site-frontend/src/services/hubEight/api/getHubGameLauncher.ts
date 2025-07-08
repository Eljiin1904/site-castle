import { Http } from "@client/services/http";

type Platform = "GPL_DESKTOP" | "GPL_MOBILE";

interface GameLauncherRequest {
  platform: Platform;
  game_code: string;
  demo: boolean;
}

interface GameLauncherResponse {
  url: string;
}

export function getGameLauncher(data: GameLauncherRequest): Promise<GameLauncherResponse[]> {
  return Http.post("/hub-eight/game/launch", data);
}
