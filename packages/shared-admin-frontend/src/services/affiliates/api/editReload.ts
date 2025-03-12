import { AffiliateReloadDocument } from "@core/types/affiliates/AffiliateReloadDocument";
import { Http } from "@client/services/http";

export function editReload(data: {
  reloadId: string;
  resetDate: Date;
  claimCount: number;
  tokenAmount: number;
}): Promise<{
  reload: AffiliateReloadDocument;
}> {
  return Http.post("/affiliates/edit-reload", data);
}
