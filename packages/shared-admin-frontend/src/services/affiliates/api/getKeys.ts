import { AffiliateKeyDocument } from "@core/types/affiliates/AffiliateKeyDocument";
import { Http } from "@client/services/http";

export function getKeys(data: {
  affiliateId: string;
  limit: number;
  page: number;
}): Promise<{
  keys: AffiliateKeyDocument[];
}> {
  return Http.post("/affiliates/get-keys", data);
}
