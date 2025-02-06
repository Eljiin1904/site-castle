import { AdventTicketDocument } from "@core/types/rewards/AdventTicketDocument";
import { Http } from "@client/services/http";

export function openAdvent(data: {
  day: number;
}): Promise<{ ticket: AdventTicketDocument }> {
  return Http.post("/rewards/open-advent", data);
}
