import type { DoubleRoll } from "./DoubleRoll";

export type DoubleRoundStatus = DoubleRoundsStatusData["status"];

export type DoubleRoundsStatusData =
  | WaitingData
  | PendingData
  | SimulatingData
  | CompletedData;

interface WaitingData {
  status: "waiting";
}

interface PendingData {
  status: "pending";
  eosBlockNum: number;
  eosCommitDate: Date;
}

interface SimulatingData {
  status: "simulating";
  roll: DoubleRoll;
  eosBlockNum: number;
  eosBlockId: string;
  eosCommitDate: Date;
}

interface CompletedData {
  status: "completed";
  roll: DoubleRoll;
  eosBlockNum: number;
  eosBlockId: string;
  eosCommitDate: Date;
}
