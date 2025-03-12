import { Http } from "@client/services/http";

export function regenUserReports(): Promise<void> {
  return Http.post("/dev/regen-user-reports");
}
