import type { providers } from "#core/services/market/constants/providers";

export type MarketProvider = (typeof providers)[number];
