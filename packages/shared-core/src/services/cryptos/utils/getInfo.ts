import { CryptoKind } from "#core/types/cryptos/CryptoKind";
import { infos } from "../constants/infos";

export function getInfo(kind: CryptoKind) {
  const crypto = infos.find((x) => x.kind === kind);

  if (!crypto) {
    throw new Error(`Unknown crypto kind, ${kind}.`);
  }

  return crypto;
}
