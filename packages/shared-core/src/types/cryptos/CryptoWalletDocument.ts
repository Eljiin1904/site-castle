import type { CryptoKind } from "./CryptoKind";

export interface CryptoWalletDocument {
  _id: string;
  timestamp: Date;
  userId: string;
  kind: CryptoKind;
  assetId: string;
  address: string;
  legacyAddress?: string;
  tag?: string;
  rotated?: boolean;
}
