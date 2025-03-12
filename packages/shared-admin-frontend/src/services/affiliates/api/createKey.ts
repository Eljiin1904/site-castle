import { AffiliateKeyDocument } from "@core/types/affiliates/AffiliateKeyDocument";
import { Http } from "@client/services/http";

export function createKey(data: { affiliateId: string }): Promise<{
  key: AffiliateKeyDocument;
}> {
  return Http.post("/affiliates/create-key", data);
}
