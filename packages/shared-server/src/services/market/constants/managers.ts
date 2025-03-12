import { MarketProvider } from "@core/types/market/MarketProvider";
import { MarketProviderManager } from "#server/types/market/MarketProviderManager";
import { SkinifyManager } from "../providers/SkinifyManager";
import { SkinsBackManager } from "../providers/SkinsBackManager";
import { SkinDeckManager } from "../providers/SkinDeckManager";

export const managers: Array<{
  name: MarketProvider;
  manager: MarketProviderManager;
}> = [
  { name: "skinify", manager: new SkinifyManager() },
  { name: "skinsback", manager: new SkinsBackManager() },
  { name: "skindeck", manager: new SkinDeckManager() },
];
