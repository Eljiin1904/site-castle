import type { BasicUser } from "../users/BasicUser";

export interface ChatRainPayout {
  user: BasicUser;
  splitAmount: number;
}
