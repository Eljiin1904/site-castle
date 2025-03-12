import type { BasicUser } from "../users/BasicUser";

export type PlayerUser = BotPlayer | HumanPlayer;

interface BotPlayer {
  bot: true;
  id: string;
  name: string;
  avatarIndex: number;
  hidden?: never;
}

interface HumanPlayer extends BasicUser {
  bot?: never;
}
