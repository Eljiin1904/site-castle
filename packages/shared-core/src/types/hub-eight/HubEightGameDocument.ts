import { ExternalGameCategory, HubEightGameInformation } from "./GameInformation";

export interface HubEightGameDocument extends HubEightGameInformation {
  _id: string;
  live_game: boolean;
  featured: boolean;
  bonus_buy: boolean;
  enabled: boolean;
  tags: string[];
  site_category: ExternalGameCategory;
}
