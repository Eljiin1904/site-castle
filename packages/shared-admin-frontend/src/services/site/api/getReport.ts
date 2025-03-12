import { SiteReport } from "@core/types/site/SiteReport";
import { Http } from "@client/services/http";

export function getReport(data: { minDate: Date; maxDate: Date }): Promise<{
  report: SiteReport;
}> {
  return Http.post("/site/get-report", data);
}
