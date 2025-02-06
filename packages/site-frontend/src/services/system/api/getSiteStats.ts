import { SiteStatsDocument } from "@core/types/site/SiteStatsDocument";
import { Http } from "@client/services/http";

export function getSiteStats(): Promise<{
  stats: SiteStatsDocument;
}> {
  return Http.post("/system/get-site-stats");
}
