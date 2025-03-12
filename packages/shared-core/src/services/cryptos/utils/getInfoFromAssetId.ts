import { infos } from "../constants/infos";

export function getInfoFromAssetId(assetId: string) {
  const crypto = infos.find((x) => x.assetId === assetId);

  if (!crypto) {
    throw new Error(`Unknown assetId, ${assetId}.`);
  }

  return crypto;
}
