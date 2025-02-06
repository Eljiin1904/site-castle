import { AffiliateReloadDocument } from "@core/types/affiliates/AffiliateReloadDocument";
import { Http } from "@client/services/http";

export function claimReload(data: { reloadId: string }): Promise<{
  reload: AffiliateReloadDocument[];
}> {
  return Http.post("/affiliates/claim-reload", data);
}
