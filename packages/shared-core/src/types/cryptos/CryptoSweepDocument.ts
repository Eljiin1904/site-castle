import type { CryptoKind } from "./CryptoKind";
import type { CryptoSymbol } from "./CryptoSymbol";

export interface CryptoSweepDocument {
  _id: string;
  timestamp: Date;
  sourceAddress: string;
  destinationAddress: string;
  txHash: string;
  cryptoSymbol: CryptoSymbol;
  cryptoKind: CryptoKind;
  usdRate: number;
  cryptoAmount: number;
  usdAmount: number;
  feeAmount: number;
  feeUsdAmount: number;
}
