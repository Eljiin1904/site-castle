import { infos } from "../constants/infos";

export function isValidAssetId(assetId: string) {
  return infos.some((x) => x.assetId === assetId);
}
