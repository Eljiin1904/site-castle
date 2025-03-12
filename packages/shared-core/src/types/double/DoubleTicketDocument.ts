import type { BasicUser } from "../users/BasicUser";
import type { DoubleBetKind } from "./DoubleBetKind";

export interface DoubleTicketDocument {
  _id: string;
  timestamp: Date;
  roundId: string;
  user: BasicUser;
  betKind: DoubleBetKind;
  betAmount: number;
  processed?: boolean;
  processedDate?: Date;
}
