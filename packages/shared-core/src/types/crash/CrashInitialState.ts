import { CrashRoundDocument } from "./CrashRoundDocument";
import { CrashTicketDocument } from "./CrashTicketDocument";


export interface CrashInitialState {
  round: CrashRoundDocument;
  history: number[];
  tickets: CrashTicketDocument[]
}
