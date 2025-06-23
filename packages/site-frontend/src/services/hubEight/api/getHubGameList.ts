import { Http } from "@client/services/http";

export function getGameList(): Promise<
  {
    url_thumbnail: string;
    url_background: string;
    game_code: string;
    name: string;
    release_date: string;
  }[]
> {
  return Http.get("/hub-eight/game/list");
}
