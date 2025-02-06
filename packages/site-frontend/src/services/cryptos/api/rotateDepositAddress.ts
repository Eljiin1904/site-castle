import { CryptoKind } from "@core/types/cryptos/CryptoKind";
import { Http } from "@client/services/http";

export function rotateDepositAddress(data: { kind: CryptoKind }): Promise<{
  address: string;
}> {
  return Http.post("/cryptos/rotate-deposit-address", data);
}
