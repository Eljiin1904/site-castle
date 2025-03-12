import type { CryptoSymbol } from "./CryptoSymbol";

export interface CryptoRateDocument {
  _id: string;
  symbol: CryptoSymbol;
  usdRate: number;
  syncDate: Date;
}
