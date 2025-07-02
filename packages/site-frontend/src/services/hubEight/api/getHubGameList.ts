import { Http } from "@client/services/http";
import { ExternalGameCategory } from "@core/types/hub-eight/GameInformation";
import { HubEightGameDocument } from "@core/types/hub-eight/HubEightGameDocument";

export function getGameList(data: {
  category?: ExternalGameCategory;
  live?: boolean;
  bonus_buy?: boolean;
  new_release?: boolean;
  products?: string[];
  searchText?: string;
  sortIndex?: number;
  page?: number;
  limit?: number;
}): Promise<{games: HubEightGameDocument[]}> {
  return Http.post("/hub-eight/game/list", data);
}
