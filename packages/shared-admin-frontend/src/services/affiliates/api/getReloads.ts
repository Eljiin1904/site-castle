import { AffiliateReloadDocument } from "@core/types/affiliates/AffiliateReloadDocument";
import { Http } from "@client/services/http";

export function getReloads(data: {
  searchText?: string;
  sortIndex?: number;
  searchIndex?: number;
  limit: number;
  page: number;
}): Promise<{
  reloads: AffiliateReloadDocument[];
}> {
  return Http.post("/affiliates/get-reloads", data);
}
