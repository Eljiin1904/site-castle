import { CrashRoundDocument } from "./CrashRoundDocument";
import { CrashTicketDocument } from "./CrashTicketDocument";


export interface CrashInitialState {
  round: CrashRoundDocument;
  history: number[];
  tickets: CrashTicketDocument[];
}

// Round: the current round
// History: all the multipliers of the last rounds
// Tickets: all the tickets of the last rounds
