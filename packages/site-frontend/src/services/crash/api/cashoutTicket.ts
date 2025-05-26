import { Http } from "@client/services/http";
import { CrashTicketDocument } from "@core/types/crash/CrashTicketDocument";

export function cashoutTicket(data: {
  roundId: string;
  betAmount: number;
}): Promise<{
  results: CrashTicketDocument;
}> {
  return Http.post("/crash/cashout-ticket", data);
}
