import type { CryptoKind } from "./CryptoKind";

export interface CryptoQuoteDocument {
  _id: string;
  timestamp: Date;
  destinationAddress: string;
  cryptoKind: CryptoKind;
  tokenAmount: number;
  usdRate: number;
  cryptoAmount: number;
  usdAmount: number;
  feeAmount: number;
  feeUsdAmount: number;
  expires: Date;
}
