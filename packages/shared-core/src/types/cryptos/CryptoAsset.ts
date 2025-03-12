import type { CryptoKind } from "./CryptoKind";

export interface CryptoAsset {
  cryptoKind: CryptoKind;
  cryptoAmount: number;
  usdAmount: number;
}
