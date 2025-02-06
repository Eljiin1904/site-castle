import { Http } from "@client/services/http";
import { DiceTargetKind } from "@core/types/dice/DiceTargetKind";
import { DiceTicketDocument } from "@core/types/dice/DiceTicketDocument";

export function postTicket(data: {
  betAmount: number;
  targetValue: number;
  targetKind: DiceTargetKind;
  betToken?: string;
}): Promise<{
  ticket: DiceTicketDocument;
}> {
  return Http.post("/dice/post-ticket", data);
}
