import { LimboTicketDocument } from "@core/types/limbo/LimboTicketDocument";
import { Http } from "@client/services/http";

export function postTicket(data: {
  betAmount: number;
  targetValue: number;
  betToken?: string;
}): Promise<{
  ticket: LimboTicketDocument;
}> {
  return Http.post("/limbo/post-ticket", data);
}
