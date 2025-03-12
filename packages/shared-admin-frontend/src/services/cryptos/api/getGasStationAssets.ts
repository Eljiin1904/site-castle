import { CryptoAsset } from "@core/types/cryptos/CryptoAsset";
import { Http } from "@client/services/http";

export function getGasStationAssets(): Promise<{
  assets: CryptoAsset[];
}> {
  return Http.post("/cryptos/get-gas-station-assets");
}
