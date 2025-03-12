import { CryptoAsset } from "@core/types/cryptos/CryptoAsset";
import { Http } from "@client/services/http";

export function getHotWalletAssets(): Promise<{
  assets: CryptoAsset[];
}> {
  return Http.post("/cryptos/get-hot-wallet-assets");
}
