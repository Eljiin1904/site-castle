import { CrashRoundDocument } from "./CrashRoundDocument";
import { CrashTicketDocument } from "./CrashTicketDocument";


export interface CrashInitialState {
  round: CrashRoundDocument;
  history: {multiplier: number, won: boolean}[];
  tickets: CrashTicketDocument[]
}
