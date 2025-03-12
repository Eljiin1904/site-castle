import { Http } from "@client/services/http";

export function regenTransactionReports(): Promise<void> {
  return Http.post("/dev/regen-transaction-reports");
}
