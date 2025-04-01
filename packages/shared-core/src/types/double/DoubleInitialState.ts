import { DoubleJackpotDetails } from "./DoubleJackpotDetails";
import type { DoubleRoll } from "./DoubleRoll";
import type { DoubleRoundDocument } from "./DoubleRoundDocument";
import type { DoubleTicketDocument } from "./DoubleTicketDocument";

export interface DoubleInitialState {
  round: DoubleRoundDocument;
  history: DoubleRoll[];
  tickets: DoubleTicketDocument[];
  jackpot: DoubleJackpotDetails;
}
