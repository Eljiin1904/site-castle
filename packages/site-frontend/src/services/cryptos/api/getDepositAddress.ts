import { CryptoKind } from "@core/types/cryptos/CryptoKind";
import { Http } from "@client/services/http";

export function getDepositAddress(data: { kind: CryptoKind }): Promise<{
  address: string;
}> {
  return Http.post("/cryptos/get-deposit-address", data);
}
