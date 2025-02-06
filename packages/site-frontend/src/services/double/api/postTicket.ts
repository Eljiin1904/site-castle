import { Http } from "@client/services/http";
import { DoubleTicketDocument } from "@core/types/double/DoubleTicketDocument";
import { DoubleBetKind } from "@core/types/double/DoubleBetKind";

export function postTicket(data: {
  roundId: string;
  betKind: DoubleBetKind;
  betAmount: number;
  betToken?: string;
}): Promise<{
  results: DoubleTicketDocument;
}> {
  return Http.post("/double/post-ticket", data);
}
