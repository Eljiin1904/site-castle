import { MarketProvider } from "@core/types/market/MarketProvider";
import { SvgQuestionCircle } from "#client/svgs/common/SvgQuestionCircle";
import { SvgSkinify } from "#client/svgs/brands/SvgSkinify";
import { SvgSkinsBack } from "#client/svgs/brands/SvgSkinsBack";
import { SvgSkinDeck } from "#client/svgs/brands/SvgSkinDeck";

export function getProviderIcon(provider: MarketProvider) {
  let icon;

  if (provider === "skinify") {
    icon = SvgSkinify;
  } else if (provider === "skinsback") {
    icon = SvgSkinsBack;
  } else if (provider === "skindeck") {
    icon = SvgSkinDeck;
  } else {
    icon = SvgQuestionCircle;
  }

  return icon;
}
