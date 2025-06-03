import { Http } from "@client/services/http";
import { CrashTicketDocument } from "@core/types/crash/CrashTicketDocument";

export function cancelTicket(): Promise<{
  results: CrashTicketDocument;
}> {
  return Http.post("/crash/cancel-ticket");
}
