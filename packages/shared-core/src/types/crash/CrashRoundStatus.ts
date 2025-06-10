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
}

interface SimulatingData {
  status: "simulating";
  multiplier: number;
}

interface CompletedData {
  status: "completed";
  multiplier: number;
}
