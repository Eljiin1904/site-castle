import type { BasicUser } from "../users/BasicUser";
import type { MinesMode } from "./MinesMode";

export type MinesGameDocument = {
  _id: string;
  timestamp: Date;
  user: BasicUser;
  mode: MinesMode;
  betAmount: number;
  gridSize: number;
  mineCount: number;
  mines: number[];
  reveals: number[];
  revealCount: number;
  clientSeed: string;
  serverSeed: string;
  serverSeedHashed: string;
  nonce: number;
  lastRevealDate?: Date;
  processed?: boolean;
  processedDate?: Date;
} & (
  | {
      completed?: never;
    }
  | {
      completed: true;
      completeDate: Date;
      won: boolean;
      wonAmount: number;
      multiplier: number;
    }
);
