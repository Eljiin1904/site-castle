import { AffiliateReloadDocument } from "@core/types/affiliates/AffiliateReloadDocument";
import { Http } from "@client/services/http";

export function createReload(data: {
  userLookup: string;
  resetDate: Date;
  tokenAmount: number;
  claimCount: number;
}): Promise<{
  reload: AffiliateReloadDocument;
}> {
  return Http.post("/affiliates/create-reload", data);
}
