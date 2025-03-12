import type { CryptoKind } from "./CryptoKind";
import type { CryptoSymbol } from "./CryptoSymbol";

export interface CryptoInfo {
  kind: CryptoKind;
  symbol: CryptoSymbol;
  network?: "ERC-20" | "TRC-20";
  networkCoin?: CryptoSymbol;
  name: string;
  assetId: string;
  walletType: "utxo" | "account";
  decimals: number;
  confirms: number;
  minWithdrawTokens: number;
  isToken?: boolean;
  canDeposit: boolean;
  canWithdraw: boolean;
  explorerUrl: string;
}
