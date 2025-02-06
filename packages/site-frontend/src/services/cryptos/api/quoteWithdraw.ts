import { CryptoKind } from "@core/types/cryptos/CryptoKind";
import { CryptoQuoteDocument } from "@core/types/cryptos/CryptoQuoteDocument";
import { Http } from "@client/services/http";

export function quoteWithdraw(data: {
  kind: CryptoKind;
  tokenAmount: number;
  destinationAddress: string;
}): Promise<{
  quote: CryptoQuoteDocument;
}> {
  return Http.post("/cryptos/quote-withdraw", data);
}
