export type RaffleStatus = RaffleStatusData["status"];

export type RaffleStatusData =
  | OpenData
  | StartingData
  | PendingData
  | DrawingData
  | CompletedData;

export interface OpenData {
  status: "open";
}

export interface StartingData {
  status: "starting";
}

export interface PendingData {
  status: "pending";
  eosBlockNum: number;
  eosCommitDate: Date;
}

export interface DrawingData {
  status: "drawing";
  eosBlockNum: number;
  eosBlockId: string;
  eosCommitDate: Date;
}

export interface CompletedData {
  status: "completed";
  eosBlockNum: number;
  eosBlockId: string;
  eosCommitDate: Date;
}
