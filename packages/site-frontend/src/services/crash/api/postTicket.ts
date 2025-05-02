import { Http } from "@client/services/http";
import { CrashTicketDocument } from "@core/types/crash/CrashTicketDocument";

export function postTicket(data: {
  roundId: string;
  betAmount: number;
  betToken?: string;
}): Promise<{
  results: CrashTicketDocument;
}> {
  return Http.post("/crash/post-ticket", data);
}
