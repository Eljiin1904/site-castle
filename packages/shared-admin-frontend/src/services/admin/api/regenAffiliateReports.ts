import { Http } from "@client/services/http";

export function regenAffiliateReports(): Promise<void> {
  return Http.post("/dev/regen-affiliate-reports");
}
