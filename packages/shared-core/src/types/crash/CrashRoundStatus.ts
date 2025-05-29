export type CrashRoundStatus = CrashRoundsStatusData["status"];

export type CrashRoundsStatusData =
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
  multiplierCrash: number;
  eosBlockNum: number;
  eosBlockId: string;
  eosCommitDate: Date;
}

interface CompletedData {
  status: "completed";
  multiplierCrash: number;
  eosBlockNum: number;
  eosBlockId: string;
  eosCommitDate: Date;
}
