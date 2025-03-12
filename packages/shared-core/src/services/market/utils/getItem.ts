import { Items } from "#core/services/items";
import { MarketItemDocument } from "#core/types/market/MarketItemDocument";
import { MarketItem } from "#core/types/market/MarketItem";

export function getItem(document: MarketItemDocument): MarketItem {
  return {
    ...Items.getBasicItem(document),
    marketHashName: document.marketHashName,
    provider: document.provider,
    externalId: document.externalId,
    tokenValue: document.tokenValue,
    usdValue: document.usdValue,
    reference: document.reference,
  };
}
