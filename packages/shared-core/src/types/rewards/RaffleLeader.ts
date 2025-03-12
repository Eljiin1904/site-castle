import type { BasicUser } from "../users/BasicUser";

export interface RaffleLeader {
  user: BasicUser;
  rank: number;
  ticketCount: number;
}
