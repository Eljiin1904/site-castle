import type { PlayerUser } from "../users/PlayerUser";

export type CaseBattlePlayer = PlayerUser;
export type CaseBattlePlayerWithResult = CaseBattlePlayer & WithResult;

type WithResult = {
  totalAmount: number;
  won: boolean;
} & (
  | {
      won: false;
    }
  | {
      won: true;
      wonAmount: number;
    }
);
