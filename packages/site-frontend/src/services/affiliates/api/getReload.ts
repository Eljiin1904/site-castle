import { AffiliateReloadDocument } from "@core/types/affiliates/AffiliateReloadDocument";
import { Http } from "@client/services/http";

export function getReload(): Promise<{
  reload: AffiliateReloadDocument;
}> {
  return Http.post("/affiliates/get-reload");
}
